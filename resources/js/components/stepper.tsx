import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type Step = {
    number: number;
    period: string;
    title: string;
    points: string[];
};

export type TimelineStepperProps = {
    steps: Step[];
};

export function TimelineStepper({ steps }: TimelineStepperProps) {
    return (
        <div className="relative flex flex-col items-center">
            {steps.map((step, i) => (
                // wrapper: does NOT scale
                <div key={i} className={cn('relative w-full max-w-3xl', i !== steps.length - 1 && 'mb-12')}>
                    {/* connector UNDER this step (except last) — NOT inside the scaling element */}
                    {i < steps.length - 1 && (
                        <div
                            aria-hidden
                            className="pointer-events-none absolute top-8 left-1/2 -z-10 h-[calc(100%+2.5rem)] w-px -translate-x-1/2 bg-theme-foreground/40"
                        />
                    )}

                    {/* ONLY this scales on hover */}
                    <Card className="peer relative transition-transform duration-200 will-change-transform hover:scale-105">
                        <CardContent className="space-y-2 text-center">
                            <h4 className="text-sm font-medium text-theme-foreground">{step.period}</h4>
                            <h3 className="text-xl leading-6 font-semibold text-theme">{step.title}</h3>
                            <ul className="mt-6 max-w-md list-disc space-y-2 pl-6 text-left text-theme-foreground">
                                {step.points.map((p, idx) => (
                                    <li key={idx}>{p}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    {/* bubble */}
                    <div className="absolute -top-4 left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-theme-accent text-sm font-semibold text-primary-foreground shadow-2xl transition-transform duration-200 ease-out peer-hover:scale-110">
                        {step.number}
                    </div>
                </div>
            ))}
        </div>
    );
}
