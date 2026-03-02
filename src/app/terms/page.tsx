import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Sector Z',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="max-w-[65ch] mx-auto px-6 lg:px-8">
        <h1 className="text-display text-3xl text-foreground mb-8">
          Terms of Service
        </h1>
        <div className="space-y-6 text-muted leading-relaxed">
          <p>Last updated: March 2026</p>
          <p>
            By accessing and using Sector Z games and services, you accept and
            agree to be bound by these terms. If you do not agree, please do not
            use this service.
          </p>
          <h2 className="text-foreground text-lg font-medium pt-4">Use License</h2>
          <p>
            Permission is granted to use Sector Z games for personal,
            non-commercial use. You may not modify, copy, or reverse engineer
            any software contained in our games.
          </p>
          <h2 className="text-foreground text-lg font-medium pt-4">Disclaimer</h2>
          <p>
            Materials are provided on an &apos;as is&apos; basis. Sector Z makes
            no warranties, expressed or implied.
          </p>
          <h2 className="text-foreground text-lg font-medium pt-4">Contact</h2>
          <p>
            Questions about these terms? Contact us at{' '}
            <a href="mailto:legal@sectorz.games" className="text-accent hover:text-accent-hover transition-colors">
              legal@sectorz.games
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
