import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { University } from '@/types/university';
import { BookmarkCheckIcon, CalendarIcon, ChartNoAxesColumn, ExternalLink, GraduationCapIcon, ImageOff, MapPin, StarIcon } from 'lucide-react';
import * as React from 'react';

interface UniversityCardProps {
    university: University;
    className?: string;
}

// Small helper to render an image with graceful fallback
function SafeImg({
    src,
    alt,
    className,
    fallbackIcon: FallbackIcon = ImageOff,
}: {
    src?: string;
    alt: string;
    className?: string;
    fallbackIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) {
    const [ok, setOk] = React.useState(true);
    return ok && src ? (
        <img src={src} alt={alt} className={className} onError={() => setOk(false)} loading="lazy" decoding="async" />
    ) : (
        <div className={'flex items-center justify-center bg-muted/40 text-muted-foreground ' + (className ?? '')} role="img" aria-label={alt}>
            <FallbackIcon className="h-6 w-6" />
        </div>
    );
}

export default function UniversityCard({ university, className }: UniversityCardProps) {
    return (
        <TooltipProvider>
            <Card className={`group gap-3 overflow-hidden rounded-2xl border pt-0 shadow-sm transition hover:shadow-md ${className}`}>
                {/* Cover */}
                <div className="relative h-40 w-full overflow-hidden bg-muted">
                    <SafeImg
                        src={university.cover}
                        alt={`${university.name} cover image`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/40 via-black/20 to-transparent">
                        <div className="h-20 w-auto overflow-hidden rounded-xl border bg-white shadow-sm backdrop-blur transition-transform duration-500 group-hover:scale-110">
                            <SafeImg src={university.logo} alt={`${university.name} logo`} className="h-full w-full object-contain p-4" />
                        </div>
                    </div>
                </div>

                <CardHeader className="gap-0.5">
                    <h3 className="text-xl font-extrabold text-wrap">{university.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{university.location}</span>
                    </div>
                </CardHeader>

                <CardContent className="my-auto grid grid-cols-2 gap-2">
                    <div>
                        <h2 className="text-sm font-semibold">Founded</h2>
                        <Badge variant="outline" className="rounded-full">
                            <CalendarIcon className="mr-1 h-3.5 w-3.5" /> {university.founded}
                        </Badge>
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold">Scholarships</h2>
                        <Badge className="rounded-full">
                            {university.scholarship ? (
                                <>
                                    <GraduationCapIcon className="mr-1 h-4 w-4" /> {university.scholarship}
                                </>
                            ) : (
                                'None provided'
                            )}
                        </Badge>
                    </div>
                </CardContent>

                <CardContent className="mt-auto flex flex-col gap-2">
                    <h2 className="text-sm font-semibold">Rankings</h2>
                    <div className="grid grid-cols-3 items-center gap-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="h-fit w-fit rounded-full border">
                                        <BookmarkCheckIcon className="h-7 w-7 p-1.5" />
                                    </div>
                                    <div className="text-center">
                                        <h6 className="text-sm font-bold">
                                            {university?.guardian_ranking ? `#${university?.guardian_ranking}` : 'Unranked'}
                                        </h6>
                                        <p className="text-[10px] font-semibold text-muted-foreground">Guarding</p>
                                    </div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>Guardian University Guide ranking</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="h-fit w-fit rounded-full border">
                                        <StarIcon className="h-7 w-7 p-1.5" />
                                    </div>
                                    <div className="text-center">
                                        <h6 className="text-sm font-bold">
                                            {university?.world_ranking ? `#${university?.world_ranking}` : 'Unranked'}
                                        </h6>
                                        <p className="text-[10px] font-semibold text-muted-foreground">THE</p>
                                    </div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>Overall global ranking (source-dependent)</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="h-fit w-fit rounded-full border">
                                        <ChartNoAxesColumn className="h-7 w-7 p-1.5" />
                                    </div>
                                    <div className="text-center">
                                        <h6 className="text-sm font-bold">{university?.qs_ranking ? `#${university?.qs_ranking}` : 'Unranked'}</h6>
                                        <p className="text-[10px] font-semibold text-muted-foreground">QS</p>
                                    </div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>QS World University Rankings</TooltipContent>
                        </Tooltip>
                    </div>
                </CardContent>

                <Separator className="mx-6" />

                <CardFooter className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="secondary" className="rounded-full">
                        View details
                    </Button>
                    {university.location_url && (
                        <Button asChild size="sm" variant="outline" className="rounded-full" onClick={(e) => e.stopPropagation()}>
                            <a href={university.location_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">
                                Open map <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </TooltipProvider>
    );
}

// Optional: lightweight skeleton for loading states
export function UniversityCardSkeleton() {
    return (
        <Card className="overflow-hidden rounded-2xl">
            <div className="h-40 w-full animate-pulse bg-muted" />
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                    <div className="h-5 w-28 animate-pulse rounded-full bg-muted" />
                    <div className="h-5 w-24 animate-pulse rounded-full bg-muted" />
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                    <div className="h-6 w-28 animate-pulse rounded-full bg-muted" />
                    <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
                    <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
                </div>
            </CardContent>
            <Separator className="mx-6" />
            <CardFooter className="flex items-center justify-between">
                <div className="h-4 w-40 animate-pulse rounded bg-muted" />
                <div className="flex gap-2">
                    <div className="h-8 w-24 animate-pulse rounded-full bg-muted" />
                    <div className="h-8 w-24 animate-pulse rounded-full bg-muted" />
                </div>
            </CardFooter>
        </Card>
    );
}
