import { Client, Databases, Storage, Permission, Role } from 'node-appwrite';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const envPath = path.join(rootDir, '.env.local');

// Load environment variables from .env.local
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '';
const apiKey = process.env.APPWRITE_API_KEY || '';

console.log('====================================================');
console.log(' MLSA SZABIST Islamabad - Appwrite Auto-Provisioning');
console.log('====================================================\n');

if (!projectId || !apiKey) {
  console.error('❌ Missing required Appwrite credentials in .env.local:');
  if (!projectId) console.error('   - NEXT_PUBLIC_APPWRITE_PROJECT_ID is missing');
  if (!apiKey) console.error('   - APPWRITE_API_KEY is missing');
  process.exit(1);
}

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setKey(apiKey);

const databases = new Databases(client);
const storage = new Storage(client);

const DB_ID = 'mlsa_db';
const DB_NAME = 'mlsa_szabist_db';
const BUCKET_ID = 'mlsa_bucket';
const BUCKET_NAME = 'mlsa_media';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function ensureDatabase() {
  console.log(`Setting up Database: "${DB_NAME}" (${DB_ID})...`);
  try {
    const db = await databases.create({
      databaseId: DB_ID,
      name: DB_NAME,
      enabled: true,
    });
    console.log(`✓ Database "${db.name}" created.`);
    return db;
  } catch (err) {
    if (err.code === 409 || err.type === 'database_already_exists') {
      console.log(`✓ Database "${DB_NAME}" (${DB_ID}) already exists.`);
      return { $id: DB_ID, name: DB_NAME };
    }
    // Fallback attempt to get if create failed for another reason
    try {
      const db = await databases.get(DB_ID);
      console.log(`✓ Database "${db.name}" verified.`);
      return db;
    } catch {
      throw err;
    }
  }
}

async function ensureCollection(collectionId, name, permissions) {
  console.log(`\nSetting up Collection: "${name}" (${collectionId})...`);
  try {
    const col = await databases.createCollection({
      databaseId: DB_ID,
      collectionId,
      name,
      permissions,
      documentSecurity: false,
      enabled: true,
    });
    console.log(`✓ Collection "${name}" created.`);
    return col;
  } catch (err) {
    if (err.code === 409 || err.type === 'collection_already_exists') {
      console.log(`✓ Collection "${name}" (${collectionId}) already exists.`);
      return { $id: collectionId, name };
    }
    // Fallback attempt to get if getCollection is allowed
    try {
      const col = await databases.getCollection({ databaseId: DB_ID, collectionId });
      console.log(`✓ Collection "${name}" verified.`);
      return col;
    } catch {
      throw err;
    }
  }
}

async function ensureStringAttribute(collectionId, key, size, required = true, defaultValue = null) {
  try {
    const params = {
      databaseId: DB_ID,
      collectionId,
      key,
      size,
      required,
    };
    if (defaultValue !== null && !required) {
      params.xdefault = defaultValue;
    }
    await databases.createStringAttribute(params);
    console.log(`  + Attribute "${key}" (string, ${size}${required ? ', required' : ''}) created.`);
    await sleep(400);
  } catch (err) {
    if (err.code === 409 || err.type === 'attribute_already_exists') {
      console.log(`  · Attribute "${key}" already exists.`);
    } else {
      console.warn(`  ⚠ Warning creating attribute "${key}": ${err.message}`);
    }
  }
}

async function ensureBucket() {
  console.log(`\nSetting up Storage Bucket: "${BUCKET_NAME}" (${BUCKET_ID})...`);
  try {
    const bucket = await storage.createBucket({
      bucketId: BUCKET_ID,
      name: BUCKET_NAME,
      permissions: [
        Permission.read(Role.any()),
        Permission.create(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),
      ],
      fileSecurity: false,
      enabled: true,
    });
    console.log(`✓ Storage Bucket "${bucket.name}" created.`);
    return bucket;
  } catch (err) {
    if (err.code === 409 || err.type === 'bucket_already_exists') {
      console.log(`✓ Storage Bucket "${BUCKET_NAME}" (${BUCKET_ID}) already exists.`);
      return { $id: BUCKET_ID, name: BUCKET_NAME };
    }
    try {
      const bucket = await storage.getBucket({ bucketId: BUCKET_ID });
      console.log(`✓ Storage Bucket "${bucket.name}" verified.`);
      return bucket;
    } catch {
      throw err;
    }
  }
}

function updateEnvFile(generatedIds) {
  console.log('\nSyncing IDs with .env.local...');
  let content = '';
  if (fs.existsSync(envPath)) {
    content = fs.readFileSync(envPath, 'utf8');
  }

  const entries = {
    NEXT_PUBLIC_APPWRITE_ENDPOINT: endpoint,
    NEXT_PUBLIC_APPWRITE_PROJECT_ID: projectId,
    APPWRITE_API_KEY: apiKey,
    NEXT_PUBLIC_APPWRITE_DATABASE_ID: generatedIds.databaseId,
    NEXT_PUBLIC_APPWRITE_EVENTS_COLLECTION_ID: generatedIds.eventsCollectionId,
    NEXT_PUBLIC_APPWRITE_UPDATES_COLLECTION_ID: generatedIds.updatesCollectionId,
    NEXT_PUBLIC_APPWRITE_TEAM_COLLECTION_ID: generatedIds.teamCollectionId,
    NEXT_PUBLIC_APPWRITE_APPLICATIONS_COLLECTION_ID: generatedIds.applicationsCollectionId,
    NEXT_PUBLIC_APPWRITE_REGISTRATIONS_COLLECTION_ID: generatedIds.registrationsCollectionId,
    NEXT_PUBLIC_APPWRITE_BUCKET_ID: generatedIds.bucketId,
  };

  const lines = content.split('\n');
  const updatedKeys = new Set();

  const newLines = lines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return line;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) return line;
    const key = trimmed.slice(0, eqIdx).trim();
    if (key in entries) {
      updatedKeys.add(key);
      return `${key}=${entries[key]}`;
    }
    return line;
  });

  for (const [key, val] of Object.entries(entries)) {
    if (!updatedKeys.has(key)) {
      newLines.push(`${key}=${val}`);
    }
  }

  fs.writeFileSync(envPath, newLines.join('\n').trim() + '\n', 'utf8');
  console.log('✓ .env.local successfully updated with all collection and bucket IDs!');
}

async function main() {
  try {
    // 1. Create / Verify Database
    await ensureDatabase();

    // 2. Collection 1: events
    await ensureCollection(
      'events',
      'events',
      [
        Permission.read(Role.any()),
        Permission.create(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),
      ]
    );
    await ensureStringAttribute('events', 'title', 255, true);
    await ensureStringAttribute('events', 'date', 100, true);
    await ensureStringAttribute('events', 'time', 100, true);
    await ensureStringAttribute('events', 'venue', 255, true);
    await ensureStringAttribute('events', 'category', 100, true);
    await ensureStringAttribute('events', 'status', 100, true);
    await ensureStringAttribute('events', 'description', 2000, true);
    await ensureStringAttribute('events', 'speaker', 255, true);
    await ensureStringAttribute('events', 'bannerUrl', 1000, false);

    // 3. Collection 2: updates
    await ensureCollection(
      'updates',
      'updates',
      [
        Permission.read(Role.any()),
        Permission.create(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),
      ]
    );
    await ensureStringAttribute('updates', 'title', 255, true);
    await ensureStringAttribute('updates', 'date', 100, true);
    await ensureStringAttribute('updates', 'category', 100, true);
    await ensureStringAttribute('updates', 'content', 2000, true);

    // 4. Collection 3: team
    await ensureCollection(
      'team',
      'team',
      [
        Permission.read(Role.any()),
        Permission.create(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),
      ]
    );
    await ensureStringAttribute('team', 'name', 255, true);
    await ensureStringAttribute('team', 'role', 255, true);
    await ensureStringAttribute('team', 'wing', 100, true);
    await ensureStringAttribute('team', 'imageUrl', 1000, false);
    await ensureStringAttribute('team', 'linkedin', 500, false);
    await ensureStringAttribute('team', 'instagram', 500, false);
    await ensureStringAttribute('team', 'portfolio', 500, false);

    // 5. Collection 4: applications
    await ensureCollection(
      'applications',
      'applications',
      [
        Permission.create(Role.any()),
        Permission.read(Role.any()),
        Permission.read(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),
      ]
    );
    await ensureStringAttribute('applications', 'fullName', 255, true);
    await ensureStringAttribute('applications', 'regNo', 100, true);
    await ensureStringAttribute('applications', 'email', 255, true);
    await ensureStringAttribute('applications', 'semester', 50, true);
    await ensureStringAttribute('applications', 'wing', 100, true);
    await ensureStringAttribute('applications', 'motivation', 2000, true);

    // 6. Collection 5: registrations
    await ensureCollection(
      'registrations',
      'registrations',
      [
        Permission.create(Role.any()),
        Permission.read(Role.any()),
        Permission.read(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),
      ]
    );
    await ensureStringAttribute('registrations', 'name', 255, true);
    await ensureStringAttribute('registrations', 'regNo', 100, true);
    await ensureStringAttribute('registrations', 'email', 255, true);
    await ensureStringAttribute('registrations', 'department', 100, false);
    await ensureStringAttribute('registrations', 'eventId', 100, true);
    await ensureStringAttribute('registrations', 'eventTitle', 255, true);

    // 7. Storage Bucket: mlsa_media
    await ensureBucket();

    // 8. Update .env.local with all generated IDs
    updateEnvFile({
      databaseId: DB_ID,
      eventsCollectionId: 'events',
      updatesCollectionId: 'updates',
      teamCollectionId: 'team',
      applicationsCollectionId: 'applications',
      registrationsCollectionId: 'registrations',
      bucketId: BUCKET_ID,
    });

    console.log('\n🎉 Appwrite provisioning completed successfully!');
    console.log('All schemas, collections, attributes, and bucket are live and ready.\n');
  } catch (error) {
    console.error('\n❌ Appwrite provisioning failed:', error.message || error);
    if (error.response) {
      console.error('Response details:', error.response);
    }
    process.exit(1);
  }
}

main();
