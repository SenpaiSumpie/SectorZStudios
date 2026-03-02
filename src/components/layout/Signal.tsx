import Link from 'next/link';
import { NewsletterForm } from '@/components/ui/NewsletterForm';

const socialLinks = [
	{
		name: 'Discord',
		href: '#',
		icon: (
			<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
				<path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
			</svg>
		),
	},
	{
		name: 'X',
		href: '#',
		icon: (
			<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
				<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
			</svg>
		),
	},
	{
		name: 'YouTube',
		href: '#',
		icon: (
			<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
				<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
				<path
					fill="var(--background)"
					d="M9.545 15.568V8.432L15.818 12z"
				/>
			</svg>
		),
	},
];

export function Signal() {
	return (
		<footer className="relative border-t border-border bg-surface">
			<div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
				{/* Signal Header */}
				<div className="text-center mb-12">
					<p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
						The Signal
					</p>
					<h2 className="text-display text-3xl lg:text-4xl text-foreground">
						Stay connected
					</h2>
				</div>

				{/* Newsletter + Social */}
				<div className="max-w-lg mx-auto space-y-8">
					<NewsletterForm inline />

					{/* Social Links */}
					<div className="flex items-center justify-center gap-6">
						{socialLinks.map((social) => (
							<a
								key={social.name}
								href={social.href}
								className="text-muted hover:text-accent transition-colors duration-200"
								aria-label={social.name}
							>
								{social.icon}
							</a>
						))}
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
					<div className="flex items-center gap-6">
						<Link
							href="/careers"
							className="hover:text-foreground transition-colors"
						>
							Careers
						</Link>
						<Link
							href="/privacy"
							className="hover:text-foreground transition-colors"
						>
							Privacy
						</Link>
						<Link
							href="/terms"
							className="hover:text-foreground transition-colors"
						>
							Terms
						</Link>
					</div>
					<p>&copy; {new Date().getFullYear()} Sector Z. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
