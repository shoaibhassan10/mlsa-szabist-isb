'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Trophy, Globe2 } from 'lucide-react';

const cards = [
  {
    icon: Code2,
    title: 'Technical Workshops',
    description:
      'Hands-on sessions on Azure, AI/ML, Power Platform, web development, and cloud computing. Level up your skills with industry-aligned curriculum.',
    gradient: 'from-azure-500/20 to-blue-600/20',
    iconBg: 'bg-azure-500/15',
    iconColor: 'text-azure-500',
    span: 'md:col-span-2',
  },
  {
    icon: Trophy,
    title: 'Imagine Cup & Hackathons',
    description:
      'Compete in Microsoft Imagine Cup, campus hackathons, and global coding challenges. Get mentored by industry experts and past winners.',
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconBg: 'bg-purple-500/15',
    iconColor: 'text-purple-400',
    span: 'md:col-span-1',
  },
  {
    icon: Globe2,
    title: 'Global Networking',
    description:
      'Connect with 100,000+ student ambassadors worldwide. Access exclusive Microsoft events, certifications, MVP mentorship, and career opportunities across the globe.',
    gradient: 'from-cyan-500/20 to-emerald-500/20',
    iconBg: 'bg-cyan-500/15',
    iconColor: 'text-cyan-400',
    span: 'md:col-span-3',
  },
];

export default function AboutBento() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-azure-400 font-mono text-sm tracking-wider uppercase">
            What We Do
          </span>
          <h2 className="section-heading mt-3">
            Building the{' '}
            <span className="gradient-text">Future of Tech</span>
          </h2>
          <p className="section-subheading mt-4 mx-auto">
            At MLSA SZABIST Islamabad, we bridge the gap between academic learning 
            and real-world technology through three core pillars.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i }}
                className={`${card.span} glass-card-hover p-8 group relative overflow-hidden`}
              >
                {/* Background glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div className={`w-14 h-14 ${card.iconBg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${card.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{card.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
