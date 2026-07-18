'use client';

import { useSyncExternalStore } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(callback: () => void) {
	const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
	mediaQuery.addEventListener('change', callback);
	return () => mediaQuery.removeEventListener('change', callback);
}

export function usePrefersReducedMotion() {
	return useSyncExternalStore(
		subscribe,
		() => window.matchMedia(REDUCED_MOTION_QUERY).matches,
		() => false
	);
}
