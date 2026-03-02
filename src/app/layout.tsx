import type { Metadata } from 'next';
import { Dela_Gothic_One, DM_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const delaGothic = Dela_Gothic_One({
	variable: '--font-display',
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
});

const dmSans = DM_Sans({
	variable: '--font-body',
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Sector Z - Atmospheric Game Studio',
	description: 'We craft atmospheric worlds and sharp, character-driven games. Step inside.',
	keywords: ['game studio', 'indie games', 'atmospheric games', 'game development'],
	authors: [{ name: 'Sector Z Studio' }],
	creator: 'Sector Z Studio',
	publisher: 'Sector Z Studio',
	openGraph: {
		title: 'Sector Z - Atmospheric Game Studio',
		description: 'We craft atmospheric worlds and sharp, character-driven games. Step inside.',
		type: 'website',
		locale: 'en_US',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Sector Z - Atmospheric Game Studio',
		description: 'We craft atmospheric worlds and sharp, character-driven games. Step inside.',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth">
			<body className={`${delaGothic.variable} ${dmSans.variable} font-sans antialiased`}>
				<Header />
				<main id="main-content">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
