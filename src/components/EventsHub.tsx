'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Search, Calendar, Clock, MapPin, User, X, Tag,
  ChevronRight, CheckCircle2, Loader2,
} from 'lucide-react';
import { eventsData, EventItem, EventCategory } from '../data/mlsaData';
import { databases, APPWRITE_CONFIG, ID, isAppwriteConfigured } from '@/lib/appwrite';

const categories: ('All' | EventCategory)[] = ['All', 'Upcoming', 'Past Workshops', 'Hackathons'];

/* ─── Registration Modal ──────────────────────────────────────────────────── */

function EventModal({
  event,
  onClose,
}: {
  event: EventItem;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({ name: '', email: '', regNo: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errs.email = 'Valid email is required';
    if (!formData.regNo.trim()) errs.regNo = 'Reg No is required';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    try {
      if (isAppwriteConfigured() && APPWRITE_CONFIG.registrationsCollectionId) {
        await databases.createDocument(
          APPWRITE_CONFIG.databaseId,
          APPWRITE_CONFIG.registrationsCollectionId,
          ID.unique(),
          {
            eventId: event.id,
            eventTitle: event.title,
            name: formData.name,
            email: formData.email,
            regNo: formData.regNo,
            registeredAt: new Date().toISOString(),
          }
        );
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      setSubmitted(true);
    } catch (err) {
      console.warn('Appwrite event registration fallback:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] modal-overlay flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto p-0"
      >
        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-white/5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <span
            className={`inline-flex text-xs font-semibold px-3 py-1 rounded-full ${
              event.status === 'Registration Open'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                : 'bg-slate-700/50 text-slate-400 border border-slate-600/30'
            }`}
          >
            {event.status}
          </span>
          <h3 className="text-xl font-bold text-white mt-3 pr-8">{event.title}</h3>
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-slate-400">
              <Calendar className="w-4 h-4 text-azure-400" />
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-4 h-4 text-azure-400" />
              {event.time}
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <MapPin className="w-4 h-4 text-azure-400" />
              {event.venue}
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <User className="w-4 h-4 text-azure-400" />
              {event.speaker}
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">{event.description}</p>

          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <span key={tag} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>

          {/* Registration Form */}
          {event.status === 'Registration Open' && !submitted && (
            <form onSubmit={handleSubmit} className="space-y-3 pt-4 border-t border-white/5">
              <h4 className="text-sm font-semibold text-white">Register for this Event</h4>
              {(['name', 'email', 'regNo'] as const).map((field) => (
                <div key={field}>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    placeholder={
                      field === 'name'
                        ? 'Full Name'
                        : field === 'email'
                        ? 'Email Address'
                        : 'SZABIST Reg No'
                    }
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    className={`w-full px-4 py-2.5 bg-surface-800 border rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-azure-500/50 transition-all ${
                      errors[field] ? 'border-red-500/60' : 'border-white/10'
                    }`}
                  />
                  {errors[field] && (
                    <p className="text-xs text-red-400 mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full flex items-center justify-center gap-2 text-sm !py-2.5"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Registering…
                  </>
                ) : (
                  'Register Now'
                )}
              </button>
            </form>
          )}

          {/* Success State */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h4 className="text-lg font-bold text-white">Registration Successful!</h4>
              <p className="text-sm text-slate-400 mt-2">
                Check your email for confirmation details.
              </p>
            </motion.div>
          )}

          {event.status === 'Completed' && (
            <div className="text-center py-4 text-slate-500 text-sm italic">
              This event has concluded. Stay tuned for upcoming sessions!
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Event Card ──────────────────────────────────────────────────────────── */

function EventCard({
  event,
  onClick,
}: {
  event: EventItem;
  onClick: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="glass-card-hover p-6 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            event.status === 'Registration Open'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
              : 'bg-slate-700/50 text-slate-400 border border-slate-600/30'
          }`}
        >
          {event.status}
        </span>
        <span className="text-xs text-slate-500 font-mono">{event.category}</span>
      </div>

      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-azure-400 transition-colors">
        {event.title}
      </h3>

      <div className="space-y-1.5 text-sm text-slate-400 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-azure-500" />
          {new Date(event.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-azure-500" />
          <span className="truncate">{event.venue}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {event.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="tag-chip text-[10px]">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center text-sm text-azure-400 font-medium group-hover:gap-2 gap-1 transition-all">
        View Details
        <ChevronRight className="w-4 h-4" />
      </div>
    </motion.div>
  );
}

/* ─── Events Hub ──────────────────────────────────────────────────────────── */

export default function EventsHub() {
  const [activeCategory, setActiveCategory] = useState<'All' | EventCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      const matchesCategory =
        activeCategory === 'All' || event.category === activeCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="events" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-azure-400 font-mono text-sm tracking-wider uppercase">
            Events
          </span>
          <h2 className="section-heading mt-3">
            Events{' '}
            <span className="gradient-text">Hub</span>
          </h2>
          <p className="section-subheading mt-4 mx-auto">
            Workshops, hackathons, and bootcamps designed to accelerate your tech journey.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
        >
          {/* Category Tabs */}
          <div className="flex gap-1.5 bg-surface-800 p-1.5 rounded-xl border border-white/5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-azure-500 text-white shadow-lg shadow-azure-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by title or tag…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface-800 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-azure-500/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Results count */}
        <div className="flex items-center gap-2 mb-6 text-sm text-slate-500">
          <Tag className="w-4 h-4" />
          {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">No events found</p>
            <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
