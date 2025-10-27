import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function extractGoogleMapUrl(embedCode: string) {
    const match = embedCode.match(/src="([^"]+)"/);
    return match ? match[1] : embedCode.trim();
}
