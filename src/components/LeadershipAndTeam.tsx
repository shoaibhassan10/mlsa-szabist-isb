'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Globe, Linkedin, Instagram, Quote, ExternalLink, Users,
} from 'lucide-react';
import {
  presidentProfile,
  teamData,
  departments,
  TeamDepartment,
} from '../data/mlsaData';

/* ─── President Spotlight ─────────────────────────────────────────────────── */

function PresidentSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative mb-20"
    >
      <div className="relative glass-card p-8 sm:p-10 glow-border overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-azure-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-br from-azure-500 to-cyan-400 p-[2px] animate-pulse-glow">
                <div className="w-full h-full rounded-2xl bg-surface-800 flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl font-bold gradient-text">
                    {presidentProfile.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-azure-500 flex items-center justify-center shadow-lg shadow-azure-500/40">
                <span className="text-white text-xs font-bold">★</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-azure-500/10 border border-azure-500/25 text-azure-400 text-xs font-semibold mb-3">
              <Users className="w-3.5 h-3.5" />
              Chapter President
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              {presidentProfile.name}
            </h3>
            <p className="text-azure-400 font-medium text-sm mt-1">
              {presidentProfile.role}
            </p>

            {/* Quote */}
            <div className="mt-5 relative pl-6 md:pl-8">
              <Quote className="absolute left-0 top-0 w-5 h-5 text-azure-500/40" />
              <p className="text-slate-300 leading-relaxed italic text-sm sm:text-base">
                "{presidentProfile.bio}"
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6 justify-center md:justify-start">
              <a
                href={presidentProfile.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-azure-400 hover:border-azure-500/40 hover:bg-azure-500/10 transition-all duration-300"
                title="Portfolio"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a
                href={presidentProfile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10 transition-all duration-300"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={presidentProfile.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-pink-400 hover:border-pink-500/40 hover:bg-pink-500/10 transition-all duration-300"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={presidentProfile.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-azure-500/10 border border-azure-500/25 text-azure-400 text-sm font-medium hover:bg-azure-500/20 transition-all duration-300"
              >
                Visit Portfolio <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Team Directory ──────────────────────────────────────────────────────── */

function TeamDirectory() {
  const [activeDept, setActiveDept] = useState<'All' | TeamDepartment>('All');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const filteredMembers =
    activeDept === 'All'
      ? teamData
      : teamData.filter((m) => m.department === activeDept);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Department Tabs */}
      <div className="flex gap-1.5 bg-surface-800 p-1.5 rounded-xl border border-white/5 mb-8 flex-wrap justify-center">
        <button
          onClick={() => setActiveDept('All')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            activeDept === 'All'
              ? 'bg-azure-500 text-white shadow-lg shadow-azure-500/25'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          All
        </button>
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setActiveDept(dept)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
              activeDept === dept
                ? 'bg-azure-500 text-white shadow-lg shadow-azure-500/25'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredMembers.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="glass-card-hover p-5 text-center group"
          >
            {/* Avatar Placeholder */}
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-azure-500/20 to-cyan-400/20 border border-white/10 flex items-center justify-center mb-3 group-hover:border-azure-500/40 transition-colors">
              <span className="text-lg font-bold gradient-text">
                {member.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </span>
            </div>
            <h4 className="text-sm font-bold text-white">{member.name}</h4>
            <p className="text-xs text-azure-400 font-medium mt-0.5">{member.role}</p>
            <p className="text-[10px] text-slate-500 mt-1 font-mono">
              {member.department}
            </p>
            {member.linkedin && member.linkedin !== '#' && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-azure-400 mt-3 transition-colors"
              >
                <Linkedin className="w-3 h-3" /> LinkedIn
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Combined Section ────────────────────────────────────────────────────── */

export default function LeadershipAndTeam() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="leadership" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-azure-400 font-mono text-sm tracking-wider uppercase">
            Our People
          </span>
          <h2 className="section-heading mt-3">
            Leadership &{' '}
            <span className="gradient-text">Core Team</span>
          </h2>
          <p className="section-subheading mt-4 mx-auto">
            Meet the passionate team driving MLSA SZABIST Islamabad forward.
          </p>
        </motion.div>

        <PresidentSpotlight />

        <div id="team">
          <TeamDirectory />
        </div>
      </div>
    </section>
  );
}
