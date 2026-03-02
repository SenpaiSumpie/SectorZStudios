import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { NewsletterForm } from '@/components/ui/NewsletterForm';

const socialLinks = [
	{ name: 'Twitter', href: '#', icon: 'twitter' },
	{ name: 'Discord', href: '#', icon: 'discord' },
	{ name: 'YouTube', href: '#', icon: 'youtube' },
	{ name: 'Steam', href: '#', icon: 'steam' },
];

const legalLinks = [
	{ name: 'Privacy Policy', href: '/privacy' },
	{ name: 'Terms of Service', href: '/terms' },
	{ name: 'Press Kit', href: '/press' },
];

export function Footer() {
	return (
		<footer className="bg-gray-900 border-t border-white/10">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
					{/* Newsletter Signup */}
					<NewsletterForm />

					{/* Social Links */}
					<div className="space-y-4">
						<h3 className="text-xl font-bold text-white">Connect</h3>
						<div className="flex space-x-4">
							{socialLinks.map((social) => (
								<a
									key={social.name}
									href={social.href}
									className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-accent hover:bg-gray-700 transition-colors"
									aria-label={social.name}
								>
									<span className="text-sm font-medium">
										{social.icon.charAt(0).toUpperCase()}
									</span>
								</a>
							))}
						</div>
						<div className="space-y-2">
							<p className="text-gray-400 text-sm">Join our community:</p>
							<Button variant="ghost" size="sm">
								Join Discord
							</Button>
						</div>
					</div>

					{/* Legal & Press */}
					<div className="space-y-4">
						<h3 className="text-xl font-bold text-white">Resources</h3>
						<div className="space-y-2">
							{legalLinks.map((link) => (
								<Link
									key={link.name}
									href={link.href}
									className="block text-gray-400 hover:text-accent transition-colors text-sm"
								>
									{link.name}
								</Link>
							))}
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
					<div className="flex items-center space-x-4">
						<Link href="/" className="text-xl text-cinematic text-white">
							SECTOR Z
						</Link>
						<span className="text-gray-500">|</span>
						<p className="text-gray-400 text-sm">
							Crafting atmospheric worlds since 2024
						</p>
					</div>
					<p className="text-gray-500 text-sm">
						© 2024 Sector Z Studio. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
