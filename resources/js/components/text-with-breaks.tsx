import { cn } from '@/lib/utils';

export function TextWithBreaks({ text, maxLength = 30, isLink = false }: { text: string; maxLength?: number; isLink?: boolean }) {
    // This regex breaks at word boundaries near the maxLength
    const regex = new RegExp(`(?![^\\n]{1,${maxLength}}$)([^\\n]{1,${maxLength}})\\s`, 'g');
    const chunks = text.split(regex).filter(Boolean);

    return (
        <span className="inline-flex flex-col">
            {chunks.map((chunk, index) => (
                <span key={index} className={cn('capitalize', isLink ? 'underline underline-offset-2' : '')}>
                    {chunk}
                    {index !== chunks.length - 1 && <br />}
                </span>
            ))}
        </span>
    );
}
