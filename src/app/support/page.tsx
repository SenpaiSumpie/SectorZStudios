import type { Metadata } from 'next';
import { SupportForm } from './SupportForm';

export const metadata: Metadata = {
  title: 'Support — Sector Z',
  description:
    'Get help with Sector Z games. Report bugs, ask about purchases, or send us feedback.',
};

export default function SupportPage() {
  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <header className="mb-16">
          <h1 className="text-display text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
            Support
          </h1>
          <p className="text-muted text-lg max-w-[65ch]">
            Something broken? Question about a purchase? Tell us what&apos;s
            going on and we&apos;ll get back to you as soon as we can.
          </p>
        </header>

        <section className="max-w-2xl">
          <SupportForm />
        </section>
      </div>
    </div>
  );
}
