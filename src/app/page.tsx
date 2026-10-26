import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutBento from '@/components/AboutBento';
import EventsHub from '@/components/EventsHub';
import UpdatesFeed from '@/components/UpdatesFeed';
import LeadershipAndTeam from '@/components/LeadershipAndTeam';
import JoinChapterForm from '@/components/JoinChapterForm';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface-900 text-slate-200">
      <Navbar />
      <main>
        <Hero />
        <AboutBento />
        <EventsHub />
        <UpdatesFeed />
        <LeadershipAndTeam />
        <JoinChapterForm />
      </main>
      <Footer />
    </div>
  );
}
