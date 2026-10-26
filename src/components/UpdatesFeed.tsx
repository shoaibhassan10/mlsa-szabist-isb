'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Megaphone, Award, Users, ArrowRight } from 'lucide-react';
import { updatesData, UpdateItem, UpdateCategory } from '../data/mlsaData';

const categoryConfig: Record<
  UpdateCategory,
  { icon: typeof Megaphone; color: string; bg: string; border: string }
> = {
  Recruitment: {
    icon: Users,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/25',
  },
  Announcement: {
    icon: Megaphone,
    color: 'text-azure-400',
    bg: 'bg-azure-500/10',
    border: 'border-azure-500/25',
  },
  Achievement: {
    icon: Award,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/25',
  },
};

const filterOptions: ('All' | UpdateCategory)[] = [
  'All',
  'Recruitment',
  'Announcement',
  'Achievement',
];

function UpdateCard({ update }: { update: UpdateItem }) {
  const config = categoryConfig[update.category];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="glass-card-hover p-6 flex gap-4"
    >
      <div
        className={`shrink-0 w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center`}
      >
        <Icon className={`w-6 h-6 ${config.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${config.bg} ${config.color} ${config.border} border uppercase tracking-wider`}
          >
            {update.category}
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {new Date(update.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
        <h3 className="text-base font-bold text-white mb-2 leading-snug">
          {update.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">{update.description}</p>
        {update.link && (
          <a
            href={update.link}
            className="inline-flex items-center gap-1 text-sm text-azure-400 font-medium mt-3 hover:gap-2 transition-all"
          >
            Learn More <ArrowRight className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function UpdatesFeed() {
  const [filter, setFilter] = useState<'All' | UpdateCategory>('All');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const filtered =
    filter === 'All'
      ? updatesData
      : updatesData.filter((u) => u.category === filter);

  return (
    <section id="updates" className="py-24 sm:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-azure-400 font-mono text-sm tracking-wider uppercase">
            Latest Updates
          </span>
          <h2 className="section-heading mt-3">
            Chapter{' '}
            <span className="gradient-text">News & Updates</span>
          </h2>
          <p className="section-subheading mt-4 mx-auto">
            Stay in the loop with recruitment drives, achievements, and important announcements.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-1.5 bg-surface-800 p-1.5 rounded-xl border border-white/5 mb-8 flex-wrap justify-center"
        >
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                filter === opt
                  ? 'bg-azure-500 text-white shadow-lg shadow-azure-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {opt}
            </button>
          ))}
        </motion.div>

        {/* Feed */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((update) => (
              <UpdateCard key={update.id} update={update} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
