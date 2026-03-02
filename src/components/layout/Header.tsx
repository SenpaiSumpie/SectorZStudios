'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
	{ name: 'Games', href: '/games' },
	{ name: 'Devlog', href: '/devlog' },
	{ name: 'Studio', href: '/studio' },
	{ name: 'Careers', href: '/careers' },
];

export function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 100);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [pathname]);

	return (
		<header
			className={cn(
				'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
				isScrolled
					? 'bg-background/80 backdrop-blur-md'
					: 'bg-transparent'
			)}
		>
			<nav className="max-w-7xl mx-auto px-6 lg:px-8">
				<div className="flex items-center justify-between h-16 lg:h-20">
					<Link
						href="/"
						className="text-display text-xl lg:text-2xl text-foreground hover:text-accent transition-colors duration-200"
					>
						SECTOR Z
					</Link>

					<div className="hidden lg:flex items-center gap-8">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={cn(
									'nav-link text-sm font-medium tracking-wide',
									pathname.startsWith(item.href) && 'nav-link--active'
								)}
							>
								{item.name}
							</Link>
						))}
					</div>

					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="lg:hidden p-2 text-foreground hover:text-accent transition-colors"
						aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							{isMobileMenuOpen ? (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M6 18L18 6M6 6l12 12"
								/>
							) : (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							)}
						</svg>
					</button>
				</div>
			</nav>

			{isMobileMenuOpen && (
				<div className="lg:hidden fixed inset-0 top-16 bg-background/98 backdrop-blur-lg z-50">
					<div className="flex flex-col items-center justify-center h-full gap-8">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={cn(
									'text-display text-3xl transition-colors duration-200',
									pathname.startsWith(item.href)
										? 'text-accent'
										: 'text-foreground hover:text-accent'
								)}
								onClick={() => setIsMobileMenuOpen(false)}
							>
								{item.name}
							</Link>
						))}
					</div>
				</div>
			)}
		</header>
	);
}
