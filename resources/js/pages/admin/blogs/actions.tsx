import { TextWithBreaks } from '@/components/text-with-breaks';
import { ContextMenuItem, ContextMenuLabel, ContextMenuSeparator } from '@/components/ui/context-menu';
import { Blog } from '@/types/blog';
import { Link } from '@inertiajs/react';
import { MapPinIcon, SquarePenIcon, Trash2Icon } from 'lucide-react';

type Props = {
    blog: Blog;
    setBlogModal: (blog: Blog) => void;
};

const BlogActions = ({ blog, setBlogModal }: Props) => {
    return (
        <>
            <ContextMenuLabel>
                <div className="flex flex-col gap-1">
                    <TextWithBreaks text={blog.title} />
                    <div className="flex gap-1 text-xs text-foreground/75">
                        <MapPinIcon className="size-4" /> {blog.date}
                    </div>
                </div>
            </ContextMenuLabel>

            <ContextMenuSeparator />

            <ContextMenuItem>
                <Link href={route('admin.blogs.show', blog.id)} className="flex gap-2">
                    <SquarePenIcon className="size-5" /> <span>Edit blog</span>
                </Link>
            </ContextMenuItem>

            <ContextMenuItem
                onClick={() => {
                    setBlogModal(blog);
                }}
            >
                <span className="flex gap-2 text-destructive">
                    <Trash2Icon className="size-5" /> <span>Delete</span>
                </span>
            </ContextMenuItem>
        </>
    );
};

export default BlogActions;
