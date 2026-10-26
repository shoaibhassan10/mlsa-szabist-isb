import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MLSA SZABIST Islamabad | Microsoft Learn Student Ambassadors',
  description:
    'Official website for Microsoft Learn Student Ambassadors (MLSA) - SZABIST Islamabad Chapter. Empowering students to build next-generation tech skills, lead communities, and solve real-world problems with Microsoft technologies.',
  keywords: [
    'MLSA',
    'SZABIST',
    'SZABIST Islamabad',
    'Microsoft Learn Student Ambassadors',
    'Azure',
    'Student Community',
    'Tech Society',
    'Pakistan Tech Community',
  ],
  authors: [{ name: 'MLSA SZABIST Islamabad Chapter' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'MLSA SZABIST Islamabad Chapter',
    description:
      'Empowering students to build skills, lead communities, and innovate with Microsoft technologies.',
    url: 'https://mlsa-szabist-isb.vercel.app',
    siteName: 'MLSA SZABIST Islamabad',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0A0F1D] text-slate-200 antialiased selection:bg-azure-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
