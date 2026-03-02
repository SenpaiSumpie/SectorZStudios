'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface Job {
  id: string;
  role: string;
  team: string;
  location: string;
  type: string;
  description: string[];
}

const jobs: Job[] = [
  {
    id: '1',
    role: 'Senior Game Designer',
    team: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description: [
      'Design core gameplay systems for atmospheric horror games. Define player progression, difficulty curves, and fear mechanics. Work directly with our Creative Director to shape player experience.',
    ],
  },
  {
    id: '2',
    role: '3D Environment Artist',
    team: 'Art',
    location: 'Remote',
    type: 'Full-time',
    description: [
      'Create atmospheric 3D environments that tell stories through environmental detail. Model, texture, and light spaces that feel lived-in, decayed, and unsettling.',
    ],
  },
  {
    id: '3',
    role: 'Audio Designer',
    team: 'Audio',
    location: 'Remote',
    type: 'Full-time',
    description: [
      'Design adaptive soundscapes that respond to player behavior. Create ambient audio, creature sounds, and environmental audio that builds tension without relying on jump scares.',
    ],
  },
  {
    id: '4',
    role: 'Frontend Developer',
    team: 'Engineering',
    location: 'Remote',
    type: 'Contract',
    description: [
      'Build and maintain our web presence, community tools, and game-adjacent web experiences. React, TypeScript, Next.js. You care about performance and craft.',
    ],
  },
  {
    id: '5',
    role: 'Community Manager',
    team: 'Community',
    location: 'Remote',
    type: 'Part-time',
    description: [
      'Grow and nurture our player community across Discord, social media, and forums. Organize playtests, gather feedback, and be the bridge between players and developers.',
    ],
  },
  {
    id: '6',
    role: 'QA Tester',
    team: 'QA',
    location: 'Remote',
    type: 'Contract',
    description: [
      'Test atmospheric horror games for bugs, performance issues, and player experience problems. Write detailed reports and work with developers to ensure quality.',
    ],
  },
];

const benefits = [
  'Competitive salary and equity',
  'Flexible working hours',
  'Remote-first culture',
  'Health and dental insurance',
  'Professional development budget',
  'Game development resources',
  'Creative freedom and autonomy',
];

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-display text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
            Careers
          </h1>
          <p className="text-muted text-lg max-w-[65ch]">
            We&apos;re a small, remote team that cares deeply about craft. If you want to make games that linger in people&apos;s minds, we want to hear from you.
          </p>
        </header>

        {/* Job Listings */}
        <section className="mb-20">
          <h2 className="text-display text-2xl text-foreground mb-8">
            Open positions
          </h2>
          <div className="divide-y divide-border">
            {jobs.map((job) => (
              <div key={job.id}>
                <button
                  onClick={() =>
                    setExpandedJob(expandedJob === job.id ? null : job.id)
                  }
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <div>
                    <h3 className="text-foreground font-medium group-hover:text-accent transition-colors">
                      {job.role}
                    </h3>
                    <p className="text-muted text-sm mt-1">
                      {job.team} · {job.location} · {job.type}
                    </p>
                  </div>
                  <svg
                    className={cn(
                      'w-5 h-5 text-muted transition-transform duration-200',
                      expandedJob === job.id && 'rotate-180'
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expandedJob === job.id && (
                  <div className="pb-6 space-y-4">
                    {job.description.map((p, i) => (
                      <p key={i} className="text-muted leading-relaxed">
                        {p}
                      </p>
                    ))}
                    <Button variant="solid" size="sm">
                      Apply
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section>
          <h2 className="text-display text-2xl text-foreground mb-8">
            What we offer
          </h2>
          <ul className="space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="text-muted flex items-center gap-3">
                <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
