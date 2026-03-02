import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'solid' | 'ghost' | 'link';
	size?: 'sm' | 'md' | 'lg';
	children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = 'solid', size = 'md', children, ...props }, ref) => {
		const baseStyles =
			'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50';

		const variants = {
			solid: 'bg-accent text-background hover:bg-accent-hover',
			ghost: 'border border-border text-foreground hover:border-accent hover:text-accent',
			link: 'text-accent hover:text-accent-hover underline-offset-4 hover:underline',
		};

		const sizes = {
			sm: 'h-9 px-4 text-sm',
			md: 'h-11 px-6 text-sm',
			lg: 'h-13 px-8 text-base',
		};

		return (
			<button
				className={cn(baseStyles, variants[variant], sizes[size], className)}
				ref={ref}
				{...props}
			>
				{children}
			</button>
		);
	}
);

Button.displayName = 'Button';

export { Button };
