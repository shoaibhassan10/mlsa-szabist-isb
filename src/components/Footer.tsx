'use client';

import { Heart, Linkedin, Instagram, Globe, MapPin, Mail, ArrowUp } from 'lucide-react';
import { chapterInfo, presidentProfile } from '../data/mlsaData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 bg-surface-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-azure-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-azure-500/30">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-none">
                  {chapterInfo.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {chapterInfo.fullName}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Empowering students to learn, build, and lead through Microsoft technologies. 
              Part of the global Microsoft Learn Student Ambassadors program with 100,000+ 
              members worldwide.
            </p>
            {/* Social Buttons */}
            <div className="flex items-center gap-3 mt-5">
              {chapterInfo.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-azure-500/40 hover:bg-azure-500/10 transition-all duration-300"
                  title={social.label}
                >
                  {social.platform === 'linkedin' ? (
                    <Linkedin className="w-5 h-5" />
                  ) : (
                    <Instagram className="w-5 h-5" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About', href: '#about' },
                { label: 'Events', href: '#events' },
                { label: 'Updates', href: '#updates' },
                { label: 'Leadership', href: '#leadership' },
                { label: 'Join Us', href: '#join' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-azure-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Campus Info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Campus
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-azure-500 mt-0.5 shrink-0" />
                <span>
                  SZABIST Islamabad Campus,<br />
                  Street 09, Plot 67, Sector H-8/4,<br />
                  Islamabad, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-azure-500 shrink-0" />
                <span>mlsa@szabist-isb.edu.pk</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} MLSA SZABIST Islamabad. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-red-400" />
            <span>by</span>
            <a
              href={presidentProfile.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-azure-400 hover:text-azure-300 font-medium inline-flex items-center gap-1 transition-colors"
            >
              {presidentProfile.name}
              <Globe className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-azure-500/90 text-white shadow-lg shadow-azure-500/30 hover:bg-azure-500 hover:shadow-azure-500/50 transition-all duration-300 hover:-translate-y-1"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
