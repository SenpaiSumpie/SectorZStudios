'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

const SUPPORT_EMAIL = 'support@sectorzstudios.com';

const topics = [
  'Bug report',
  'Technical issue',
  'Purchase or refund',
  'Feedback',
  'Other',
];

export function SupportForm() {
  const [topic, setTopic] = useState(topics[0]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = `[${topic}] Support request${name.trim() ? ` from ${name.trim()}` : ''}`;
    const body = message.trim();

    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const inputClasses =
    'w-full px-4 py-3 bg-surface border border-border text-foreground placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="support-topic" className="block text-sm text-foreground mb-2">
          Topic
        </label>
        <select
          id="support-topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className={inputClasses}
        >
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="support-name" className="block text-sm text-foreground mb-2">
          Name <span className="text-muted">(optional)</span>
        </label>
        <input
          id="support-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="support-message" className="block text-sm text-foreground mb-2">
          Message
        </label>
        <textarea
          id="support-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your issue. For bugs, include your platform and what you were doing when it happened."
          rows={6}
          required
          className={inputClasses}
        />
      </div>

      <Button type="submit" disabled={!message.trim()}>
        Open email to send
      </Button>

      <p className="text-muted text-sm">
        Submitting opens your email app with the message addressed to{' '}
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="text-accent hover:text-accent-hover transition-colors"
        >
          {SUPPORT_EMAIL}
        </a>
        . You can also write to us there directly.
      </p>
    </form>
  );
}
