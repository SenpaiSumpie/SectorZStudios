'use client';

import { useState } from 'react';
import { Button } from './Button';
import { cn } from '@/lib/utils';

interface NewsletterFormProps {
	className?: string;
	title?: string;
	description?: string;
	placeholder?: string;
	buttonText?: string;
	inline?: boolean;
}

interface FormState {
	email: string;
	isSubmitting: boolean;
	isSubmitted: boolean;
	error: string | null;
}

export function NewsletterForm({
	className,
	title = 'Stay Updated',
	description = 'Get the latest news about our games and studio updates.',
	placeholder = 'Enter your email',
	buttonText = 'Subscribe',
	inline = false,
}: NewsletterFormProps) {
	const [state, setState] = useState<FormState>({
		email: '',
		isSubmitting: false,
		isSubmitted: false,
		error: null,
	});

	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Reset error state
		setState((prev) => ({ ...prev, error: null }));

		// Validate email
		if (!state.email.trim()) {
			setState((prev) => ({ ...prev, error: 'Email is required' }));
			return;
		}

		if (!validateEmail(state.email)) {
			setState((prev) => ({ ...prev, error: 'Please enter a valid email address' }));
			return;
		}

		// Set submitting state
		setState((prev) => ({ ...prev, isSubmitting: true }));

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// In a real app, you would make an API call here
			// const response = await fetch('/api/newsletter', {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify({ email: state.email })
			// });

			setState((prev) => ({
				...prev,
				isSubmitting: false,
				isSubmitted: true,
				email: '',
			}));

			// Reset success message after 5 seconds
			setTimeout(() => {
				setState((prev) => ({ ...prev, isSubmitted: false }));
			}, 5000);
		} catch (error) {
			setState((prev) => ({
				...prev,
				isSubmitting: false,
				error: 'Something went wrong. Please try again.',
			}));
		}
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState((prev) => ({
			...prev,
			email: e.target.value,
			error: null, // Clear error when user starts typing
		}));
	};

	if (state.isSubmitted) {
		return (
			<div className={cn('space-y-4', className)}>
				<div className="text-center p-6 bg-accent-muted border border-accent/30">
					<div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
						<svg
							className="w-6 h-6 text-foreground"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
					<h3 className="text-lg font-semibold text-foreground mb-2">
						Successfully Subscribed!
					</h3>
					<p className="text-foreground/70 text-sm">
						Thank you for subscribing. You&apos;ll receive our latest updates and
						exclusive content.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className={cn('space-y-4', className)}>
			{!inline && (
				<>
					<h3 className="text-xl font-bold text-foreground">{title}</h3>
					<p className="text-muted">{description}</p>
				</>
			)}

			<form
				onSubmit={handleSubmit}
				className={cn(
					'space-y-3',
					inline && 'flex flex-col sm:flex-row sm:space-y-0 sm:space-x-3'
				)}
				noValidate
			>
				<div className={cn('relative', inline && 'flex-1')}>
					<input
						type="email"
						value={state.email}
						onChange={handleEmailChange}
						placeholder={placeholder}
						disabled={state.isSubmitting}
						className={cn(
							'w-full px-4 py-3 bg-surface border text-foreground placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed',
							state.error ? 'border-red-500 focus:ring-red-500' : 'border-border'
						)}
						aria-invalid={!!state.error}
						aria-describedby={state.error ? 'email-error' : undefined}
					/>

					{state.error && (
						<div
							id="email-error"
							className="absolute -bottom-6 left-0 text-red-400 text-sm"
							role="alert"
						>
							{state.error}
						</div>
					)}
				</div>

				<Button
					type="submit"
					disabled={state.isSubmitting || !state.email.trim()}
					className={cn('transition-all duration-200', inline ? 'sm:w-auto' : 'w-full')}
				>
					{state.isSubmitting ? (
						<div className="flex items-center space-x-2">
							<div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
							<span>Subscribing...</span>
						</div>
					) : (
						buttonText
					)}
				</Button>
			</form>

			{!inline && (
				<p className="text-muted text-sm">
					No spam, unsubscribe anytime. We respect your privacy.
				</p>
			)}
		</div>
	);
}

// Inline variant for use in headers/footers
export function InlineNewsletterForm(props: Omit<NewsletterFormProps, 'inline'>) {
	return <NewsletterForm {...props} inline={true} />;
}
