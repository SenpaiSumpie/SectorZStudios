import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Studio — Sector Z',
  description: 'Who we are and why we make atmospheric horror games.',
};

const team = [
  { name: 'Alex Chen', role: 'Creative Director' },
  { name: 'Sarah Martinez', role: 'Lead Developer' },
  { name: 'David Kim', role: 'Art Director' },
  { name: 'Emma Thompson', role: 'Audio Designer' },
  { name: 'Marcus Johnson', role: 'Game Designer' },
  { name: 'Lisa Wang', role: 'Producer' },
];

const artworks = [
  '/images/studio/concept-01.png',
  '/images/studio/concept-02.png',
  '/images/studio/concept-03.png',
  '/images/studio/concept-04.png',
  '/images/studio/concept-05.png',
  '/images/studio/concept-06.png',
];

export default function StudioPage() {
  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      {/* Manifesto */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <h1 className="text-display text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-8">
          We believe the best horror doesn&apos;t scare you — it stays with you.
        </h1>
        <div className="max-w-[65ch] space-y-6">
          <p className="text-muted text-lg leading-relaxed">
            Sector Z was founded on a simple conviction: that games can be more than entertainment. They can be experiences that reshape how you see the dark.
          </p>
          <p className="text-muted text-lg leading-relaxed">
            Every project we take on starts with a question: what if? What if sound was your only weapon? What if memories could fight back? What if the game learned what scared you? We chase those questions into the unknown and build worlds around what we find.
          </p>
        </div>
      </section>

      {/* Concept Art Showcase */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {artworks.map((src, i) => (
              <div key={i} className="aspect-video bg-surface overflow-hidden">
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <h2 className="text-display text-2xl lg:text-3xl text-foreground mb-10">
          Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
          {team.map((member) => (
            <div key={member.name}>
              <p className="text-foreground font-medium">{member.name}</p>
              <p className="text-muted text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Press Kit */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
        <p className="text-muted text-sm">
          Press inquiries:{' '}
          <a href="mailto:press@sectorz.studio" className="text-accent hover:text-accent-hover transition-colors">
            press@sectorz.studio
          </a>
        </p>
      </section>
    </div>
  );
}
