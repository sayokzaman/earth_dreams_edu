import { TableData } from '@/types/table';
import { University } from '@/types/university';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function extractGoogleMapUrl(embedCode: string) {
    const match = embedCode.match(/src="([^"]+)"/);
    return match ? match[1] : embedCode.trim();
}

export function extractYoutubeUrl(input: string): string {
    // If input contains iframe tag, extract src attribute
    const iframeMatch = input.match(/src=["']([^"']+)["']/);
    if (iframeMatch) {
        return iframeMatch[1];
    }
    // Otherwise return the input as-is (it's already a URL)
    return input;
}

// utilities
const isNum = (s: unknown) => /^\d+$/.test(String(s));

export function compactPagination(universities: TableData<University>) {
    const links = universities.links as Array<{ label: string; url: string | null; active?: boolean }>;

    // pick prev/next from Laravel's links array
    const prev = links.find((l) => /Previous/i.test(String(l.label)));
    const next = links.find((l) => /Next/i.test(String(l.label)));

    // find last page number from numeric labels
    const nums = links.filter((l) => isNum(l.label)).map((l) => Number(l.label));
    const lastPage = nums.length ? Math.max(...nums) : 1;

    // pages you want to show
    const base = [1, 2, 3].filter((n) => n <= lastPage);
    const pages = lastPage > 3 ? [...base, '…', lastPage] : base;

    return { prev, next, pages };
}
