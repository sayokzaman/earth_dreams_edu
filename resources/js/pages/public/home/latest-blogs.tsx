import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Blog } from '@/types/blog';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, ChartNoAxesGanttIcon, ExternalLinkIcon, GraduationCapIcon } from 'lucide-react';

const LatestBlogs = ({ blogs, news }: { blogs: Blog[]; news: Blog[] }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="mb-12 flex flex-col items-center gap-4">
                <span className="space-x-2 text-center text-3xl font-extrabold tracking-tight capitalize sm:text-4xl drop-shadow-sm">
                    <span className="text-theme-accent/90">Blogs</span> <span>&</span> <span className="text-theme-secondary/80">News</span>
                </span>

                <p className="max-w-3xl text-center text-theme-foreground sm:text-xl">
                    Stay updated with the latest insights, trends, and events in education. Explore our blogs and news to make informed decisions
                    about your academic journey.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="grid gap-4">
                    <h2 className="text-2xl font-semibold">Read Our Latest Blogs</h2>
                    {blogs ? blogs.map((blog) => <BlogCard blog={blog} key={blog.id} />) : <p>Stay Tuned For Latest Blogs</p>}
                </div>

                <div className="grid gap-4">
                    <h2 className="text-2xl font-semibold">News & Event Updates</h2>
                    {news ? news.map((newsItem) => <BlogCard blog={newsItem} key={newsItem.id} />) : <p>Stay Tuned For Latest Blogs</p>}
                </div>
            </div>

            <Link href={route('public.blogs.index')}>
                <Button className="mt-8 h-12 min-w-80 rounded-3xl text-lg font-semibold shadow-lg hover:shadow-xl">
                    Read More Blogs & News <ExternalLinkIcon className="ml-1 size-5" />
                </Button>
            </Link>
        </div>
    );
};

export default LatestBlogs;

function BlogCard({ blog, className }: { blog: Blog; className?: string }) {
    const textContent = blog.contents.find((c) => c.type === 'text')?.paragraph || '';

    return (
        <Card className={`group flex-row gap-6 overflow-hidden rounded-2xl border shadow-sm transition hover:shadow-md ${className}`}>
            {/* Cover */}
            <div className="relative flex h-full w-4/12 items-center justify-center overflow-hidden pl-4">
                <img
                    src={blog.cover_img}
                    alt={`${blog.title} cover image`}
                    className="mb-6 aspect-video h-40 w-fit rounded-lg border object-cover shadow-sm transition-transform duration-500"
                />

                <div className="pointer-events-none absolute inset-0 hidden items-center justify-center bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
            </div>

            <div className="flex w-8/12 flex-col gap-3">
                <CardHeader className="gap-2 pl-0">
                    <h3 className="text-xl font-semibold tracking-tight text-wrap lg:line-clamp-1">{blog.title}</h3>

                    <div className="flex flex-col gap-1 text-sm text-theme-foreground">
                        <div className="flex gap-1.5">
                            <ChartNoAxesGanttIcon className="h-5 w-5" />
                            <h4 className="font-semibold underline underline-offset-2">Overview:</h4>
                        </div>
                        <div className="line-clamp-2 text-muted-foreground" dangerouslySetInnerHTML={{ __html: textContent }} />
                    </div>
                </CardHeader>

                <div className="mx-6">
                    <Separator />
                </div>

                <CardContent className="my-auto grid gap-2 pl-0 xl:grid-cols-2">
                    <div>
                        <h2 className="text-sm font-semibold">Published Date</h2>
                        <Badge className="rounded-full font-semibold capitalize">
                            <CalendarIcon className="mr-1 h-3.5 w-3.5" /> {format(new Date(blog.date), 'MMMM dd, yyyy')}
                        </Badge>
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold">Category</h2>
                        <Badge className="rounded-full font-semibold capitalize">
                            <GraduationCapIcon className="mr-1 h-3.5 w-3.5" /> <span className="text-wrap">{blog.category}</span>
                        </Badge>
                    </div>
                </CardContent>

                <div className="mx-6">
                    <Separator />
                </div>

                <CardFooter className="flex justify-center pl-0">
                    <Button size="sm" variant="secondary" className="w-full rounded-full lg:mx-6">
                        Read More
                    </Button>
                </CardFooter>
            </div>
        </Card>
    );
}
