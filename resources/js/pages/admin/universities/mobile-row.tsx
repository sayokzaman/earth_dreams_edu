import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { University } from '@/types/university';
import { Link } from '@inertiajs/react';
import {
    BookmarkCheckIcon,
    Calendar,
    ChartNoAxesColumn,
    GraduationCap,
    ImageOff,
    MapPin,
    MoreVertical,
    SquarePenIcon,
    StarIcon,
    Trash2Icon,
} from 'lucide-react';
import * as React from 'react';

// Helper to render an image with graceful fallback
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
            <FallbackIcon className="h-4 w-4" />
        </div>
    );
}

const UniversityMobileRow = ({
    university,
    setUniversityModal,
}: {
    university: University;
    setUniversityModal: (university: University) => void;
}) => {
    return (
        <div className="group relative rounded-lg border bg-background shadow-sm">
            {/* Cover Image Banner */}
            <div className="relative h-24 w-full bg-muted">
                <SafeImg
                    src={`/storage/${university?.cover}`}
                    alt={`${university.name} cover`}
                    className="h-full w-full overflow-hidden object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-t from-black/40 via-black/20 to-transparent" />

                {/* Logo overlay */}
                <div className="absolute bottom-0 left-4 translate-y-1/2">
                    <div className="h-16 w-16 overflow-hidden rounded-lg border-2 border-background bg-background p-1.5 shadow-md">
                        <SafeImg src={`/storage/${university?.logo}`} alt={`${university.name} logo`} className="h-full w-full object-contain" />
                    </div>
                </div>

                {/* Actions Menu */}
                <div className="absolute top-3 right-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="size-8 rounded-full shadow-md">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-[200px]">
                            <DropdownMenuLabel>
                                <div className="truncate">{university.name}</div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href={route('admin.universities.show', university.id)} className="flex items-center gap-2">
                                    <SquarePenIcon className="h-4 w-4" /> <span>Edit University</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setUniversityModal(university)} className="flex items-center gap-2 text-destructive">
                                <Trash2Icon className="h-4 w-4" /> <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="space-y-3 p-4 pt-10">
                {/* Title and Location */}
                <div>
                    <Link
                        href={route('admin.universities.show', university.id)}
                        className="line-clamp-2 text-base font-bold underline-offset-2 hover:underline"
                    >
                        {university.name}
                    </Link>
                    <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{university.location}</span>
                    </div>
                </div>

                {/* Founded and Scholarship */}
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <p className="text-[10px] font-medium text-muted-foreground uppercase">Founded</p>
                        <Badge variant="outline" className="mt-1">
                            <Calendar className="mr-1 h-3 w-3" /> {university.founded}
                        </Badge>
                    </div>
                    <div>
                        <p className="text-[10px] font-medium text-muted-foreground uppercase">Scholarship</p>
                        <Badge variant="secondary" className="mt-1">
                            {university.scholarship ? (
                                <>
                                    <GraduationCap className="mr-1 h-3 w-3" /> {university.scholarship}
                                </>
                            ) : (
                                'N/A'
                            )}
                        </Badge>
                    </div>
                </div>

                <Separator />

                {/* Rankings */}
                <div>
                    <p className="mb-2 text-xs font-semibold">Rankings</p>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="flex flex-col items-center gap-1 rounded-md border p-2">
                            <BookmarkCheckIcon className="h-5 w-5 text-muted-foreground" />
                            <p className="text-xs font-bold">{university?.guardian_ranking ? `#${university.guardian_ranking}` : '—'}</p>
                            <p className="text-[9px] text-muted-foreground uppercase">Guardian</p>
                        </div>
                        <div className="flex flex-col items-center gap-1 rounded-md border p-2">
                            <StarIcon className="h-5 w-5 text-muted-foreground" />
                            <p className="text-xs font-bold">{university?.world_ranking ? `#${university.world_ranking}` : '—'}</p>
                            <p className="text-[9px] text-muted-foreground uppercase">THE</p>
                        </div>
                        <div className="flex flex-col items-center gap-1 rounded-md border p-2">
                            <ChartNoAxesColumn className="h-5 w-5 text-muted-foreground" />
                            <p className="text-xs font-bold">{university?.qs_ranking ? `#${university.qs_ranking}` : '—'}</p>
                            <p className="text-[9px] text-muted-foreground uppercase">QS</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniversityMobileRow;
