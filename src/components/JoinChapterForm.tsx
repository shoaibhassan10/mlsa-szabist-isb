'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { databases, APPWRITE_CONFIG, ID, isAppwriteConfigured } from '@/lib/appwrite';

interface FormData {
  fullName: string;
  regNo: string;
  email: string;
  semester: string;
  preferredWing: string;
  motivation: string;
}

const initialForm: FormData = {
  fullName: '',
  regNo: '',
  email: '',
  semester: '',
  preferredWing: '',
  motivation: '',
};

const semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

const wings = [
  'Technical Team',
  'Event Management',
  'Media & Design',
  'Marketing & PR',
];

export default function JoinChapterForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const validate = (): Partial<Record<keyof FormData, string>> => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.regNo.trim()) errs.regNo = 'Registration number is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      errs.email = 'Valid email is required';
    if (!form.semester) errs.semester = 'Select your semester';
    if (!form.preferredWing) errs.preferredWing = 'Select a wing';
    if (!form.motivation.trim()) errs.motivation = 'Tell us your motivation';
    else if (form.motivation.trim().length < 20)
      errs.motivation = 'At least 20 characters';
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      if (isAppwriteConfigured() && APPWRITE_CONFIG.applicationsCollectionId) {
        await databases.createDocument(
          APPWRITE_CONFIG.databaseId,
          APPWRITE_CONFIG.applicationsCollectionId,
          ID.unique(),
          {
            fullName: form.fullName,
            regNo: form.regNo,
            email: form.email,
            semester: form.semester,
            preferredWing: form.preferredWing,
            motivation: form.motivation,
            submittedAt: new Date().toISOString(),
          }
        );
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      setSubmitted(true);
    } catch (err) {
      console.warn('Appwrite application submission fallback:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 bg-surface-800 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-azure-500/50 transition-all ${
      errors[field] ? 'border-red-500/60' : 'border-white/10'
    }`;

  return (
    <section id="join" className="py-24 sm:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-azure-500/8 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-azure-400 font-mono text-sm tracking-wider uppercase">
            Recruitment
          </span>
          <h2 className="section-heading mt-3">
            Join{' '}
            <span className="gradient-text">Our Chapter</span>
          </h2>
          <p className="section-subheading mt-4 mx-auto">
            Become part of SZABIST Islamabad's most active tech community. 
            Fill out the form below to apply.
          </p>
        </motion.div>

        {!submitted ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="glass-card p-6 sm:p-8 space-y-5"
          >
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="e.g., Shoaib Hassan"
                className={inputClass('fullName')}
              />
              {errors.fullName && (
                <p className="flex items-center gap-1 text-xs text-red-400 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Reg No + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  SZABIST Reg No
                </label>
                <input
                  type="text"
                  name="regNo"
                  value={form.regNo}
                  onChange={handleChange}
                  placeholder="e.g., 2024-BSE-001"
                  className={inputClass('regNo')}
                />
                {errors.regNo && (
                  <p className="flex items-center gap-1 text-xs text-red-400 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.regNo}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={inputClass('email')}
                />
                {errors.email && (
                  <p className="flex items-center gap-1 text-xs text-red-400 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Semester + Wing row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Semester
                </label>
                <select
                  name="semester"
                  value={form.semester}
                  onChange={handleChange}
                  className={inputClass('semester')}
                >
                  <option value="">Select Semester</option>
                  {semesters.map((s) => (
                    <option key={s} value={s}>
                      {s} Semester
                    </option>
                  ))}
                </select>
                {errors.semester && (
                  <p className="flex items-center gap-1 text-xs text-red-400 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.semester}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Preferred Wing
                </label>
                <select
                  name="preferredWing"
                  value={form.preferredWing}
                  onChange={handleChange}
                  className={inputClass('preferredWing')}
                >
                  <option value="">Select Wing</option>
                  {wings.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
                {errors.preferredWing && (
                  <p className="flex items-center gap-1 text-xs text-red-400 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.preferredWing}
                  </p>
                )}
              </div>
            </div>

            {/* Motivation */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Why do you want to join MLSA SZABIST?
              </label>
              <textarea
                name="motivation"
                value={form.motivation}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about your passion for technology, what you hope to learn, and how you'd contribute to the community…"
                className={`${inputClass('motivation')} resize-none`}
              />
              {errors.motivation && (
                <p className="flex items-center gap-1 text-xs text-red-400 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.motivation}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full flex items-center justify-center gap-2 text-base"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting Application…
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Application
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-10 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Application Submitted!</h3>
            <p className="text-slate-400 mt-3 max-w-md mx-auto leading-relaxed">
              Thank you for your interest in MLSA SZABIST Islamabad! We'll review your 
              application and get back to you via email within 3–5 business days.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm(initialForm);
              }}
              className="btn-outline mt-6 text-sm"
            >
              Submit Another Application
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
