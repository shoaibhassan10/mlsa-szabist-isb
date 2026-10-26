import { Client, Account, Databases, Storage, ID, Query } from 'appwrite';

export const APPWRITE_CONFIG = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '',
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
  eventsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_EVENTS_COLLECTION_ID || '',
  updatesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_UPDATES_COLLECTION_ID || '',
  teamCollectionId: process.env.NEXT_PUBLIC_APPWRITE_TEAM_COLLECTION_ID || '',
  applicationsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_APPLICATIONS_COLLECTION_ID || '',
  registrationsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_REGISTRATIONS_COLLECTION_ID || '',
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || '',
};

export const isAppwriteConfigured = () => {
  return Boolean(
    APPWRITE_CONFIG.endpoint &&
    APPWRITE_CONFIG.projectId &&
    APPWRITE_CONFIG.databaseId
  );
};

// Initialize Appwrite Client
export const client = new Client();

if (APPWRITE_CONFIG.endpoint && APPWRITE_CONFIG.projectId) {
  client
    .setEndpoint(APPWRITE_CONFIG.endpoint)
    .setProject(APPWRITE_CONFIG.projectId);
}

// Service instances
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export { ID, Query };
