import Link from 'next/link';
import { games } from '@/data/games';

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
	{
		name: 'Instagram',
		href: '#',
		icon: (
			<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
			</svg>
		),
	},
];

const gameLinks = games.map((g) => ({
	title: g.title,
	href: `/games/${g.slug}`,
}));

const studioLinks = [
	{ title: 'About the Studio', href: '/studio' },
	{ title: 'News & Devlog', href: '/devlog' },
	{ title: 'Open Positions', href: '/careers' },
	{ title: 'Contact', href: '/contact' },
	{ title: 'Press Kit', href: '/press' },
];

export function Signal() {
	return (
		<footer className="relative border-t border-border bg-surface">
			<div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
				{/* Main Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">
					{/* Games Column */}
					<div className="lg:col-span-1 mb-2">
						<h3 className="text-sm font-medium tracking-widest uppercase text-foreground mb-6">
							Games
						</h3>
						<ul className="space-y-4">
							{gameLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-muted text-sm hover:text-foreground transition-colors duration-200"
									>
										{link.title}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Studio Column */}
					<div className="lg:col-span-1">
						<h3 className="text-sm font-medium tracking-widest uppercase text-foreground mb-6">
							Studio
						</h3>
						<ul className="space-y-3">
							{studioLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-muted text-sm hover:text-foreground transition-colors duration-200"
									>
										{link.title}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Community Column */}
					<div className="lg:col-span-1">
						<h3 className="text-sm font-medium tracking-widest uppercase text-foreground mb-6">
							Community
						</h3>
						<ul className="space-y-4">
							<li>
								<a
									href="#"
									className="text-muted text-sm hover:text-foreground transition-colors duration-200"
								>
									Discord Server
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-muted text-sm hover:text-foreground transition-colors duration-200"
								>
									Newsletter
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-muted text-sm hover:text-foreground transition-colors duration-200"
								>
									Bug Reports
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-muted text-sm hover:text-foreground transition-colors duration-200"
								>
									Support
								</a>
							</li>
						</ul>
					</div>

					{/* Follow Us Column */}
					<div className="lg:col-span-1">
						<h3 className="text-sm font-medium tracking-widest uppercase text-foreground mb-6">
							Follow Us
						</h3>
						<div className="flex items-center gap-4">
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
				</div>

				{/* Bottom Bar */}
				<div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
					<p>&copy; {new Date().getFullYear()} Sector Z. All rights reserved.</p>
					<div className="flex items-center gap-6">
						<Link
							href="/terms"
							className="hover:text-foreground transition-colors"
						>
							Terms & Conditions
						</Link>
						<Link
							href="/privacy"
							className="hover:text-foreground transition-colors"
						>
							Privacy Policy
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
