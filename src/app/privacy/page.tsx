import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Sector Z',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="max-w-[65ch] mx-auto px-6 lg:px-8">
        <h1 className="text-display text-3xl text-foreground mb-8">
          Privacy Policy
        </h1>
        <div className="space-y-6 text-muted leading-relaxed">
          <p>Last updated: March 2026</p>
          <p>
            Sector Z respects your privacy. This policy describes how we collect,
            use, and protect your information when you visit our website.
          </p>
          <h2 className="text-foreground text-lg font-medium pt-4">Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you
            subscribe to our newsletter or contact us. This may include your
            email address and any messages you send to us.
          </p>
          <h2 className="text-foreground text-lg font-medium pt-4">How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve
            our services, send you updates about our games, and respond to your
            requests.
          </p>
          <h2 className="text-foreground text-lg font-medium pt-4">Contact</h2>
          <p>
            Questions about this policy? Contact us at{' '}
            <a href="mailto:privacy@sectorz.games" className="text-accent hover:text-accent-hover transition-colors">
              privacy@sectorz.games
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
