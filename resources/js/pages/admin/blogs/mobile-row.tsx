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
import { Blog } from '@/types/blog';
import { Link } from '@inertiajs/react';
import { Clock, FileText, ImageOff, MoreVertical, SquarePenIcon, Trash2Icon, User } from 'lucide-react';
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

const BlogMobileRow = ({ blog, setBlogModal }: { blog: Blog; setBlogModal: (blog: Blog) => void }) => {
    return (
        <div className="group relative rounded-lg border bg-background shadow-sm">
            {/* Cover Banner */}
            <div className="relative h-24 w-full bg-muted">
                <SafeImg
                    src={blog.cover_img ? `/storage/${blog.cover_img}` : undefined}
                    alt={`${blog.title} cover`}
                    className="h-full w-full overflow-hidden object-cover transition-transform duration-300 group-hover:scale-105"
                    fallbackIcon={FileText}
                />
                <div className="pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-t from-black/40 via-black/20 to-transparent" />

                {/* Icon overlay */}
                <div className="absolute bottom-0 left-4 translate-y-1/2">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border-2 border-background bg-background shadow-md">
                        <FileText className="h-8 w-8 text-muted-foreground" />
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
                                <div className="truncate">{blog.title}</div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href={route('admin.blogs.show', blog.id)} className="flex items-center gap-2">
                                    <SquarePenIcon className="h-4 w-4" /> <span>Edit Blog</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setBlogModal(blog)} className="flex items-center gap-2 text-destructive">
                                <Trash2Icon className="h-4 w-4" /> <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="space-y-3 p-4 pt-10">
                {/* Title and Author */}
                <div>
                    <Link href={route('admin.blogs.show', blog.id)} className="line-clamp-2 text-base font-bold underline-offset-2 hover:underline">
                        {blog.title}
                    </Link>
                    <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span>{blog.author.name}</span>
                    </div>
                </div>

                {/* Category and Type */}
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <p className="text-[10px] font-medium text-muted-foreground uppercase">Category</p>
                        <Badge variant="outline" className="mt-1 capitalize">
                            {blog.category?.name}
                        </Badge>
                    </div>
                    <div>
                        <p className="text-[10px] font-medium text-muted-foreground uppercase">Type</p>
                        <Badge variant="secondary" className="mt-1 capitalize">
                            {blog.type}
                        </Badge>
                    </div>
                </div>

                <Separator />

                {/* Published Date */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
};

export default BlogMobileRow;
