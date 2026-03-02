import type { Metadata } from 'next';
import { Instrument_Serif } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Signal } from '@/components/layout/Signal';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { DustMotes } from '@/components/ui/DustMotes';

const instrumentSerif = Instrument_Serif({
	variable: '--font-heading',
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Sector Z — Atmospheric Horror Games',
	description: 'We make atmospheric horror games. Step inside.',
	keywords: ['game studio', 'horror games', 'atmospheric games', 'indie games'],
	authors: [{ name: 'Sector Z' }],
	creator: 'Sector Z',
	openGraph: {
		title: 'Sector Z — Atmospheric Horror Games',
		description: 'We make atmospheric horror games. Step inside.',
		type: 'website',
		locale: 'en_US',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Sector Z — Atmospheric Horror Games',
		description: 'We make atmospheric horror games. Step inside.',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth">
			<body
				className={`${instrumentSerif.variable} ${GeistSans.variable} font-sans antialiased`}
			>
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-accent text-black px-4 py-2 z-[9999]"
				>
					Skip to main content
				</a>
				<Header />
				<main id="main-content">{children}</main>
				<Signal />
				<div className="vignette" aria-hidden="true" />
				<CustomCursor />
				<DustMotes />
			</body>
		</html>
	);
}
