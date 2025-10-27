import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Wrapper from '@/components/wrapper';
import AppPublicLayout from '@/layouts/app/app-public-layout';
import { Blog } from '@/types/blog';
import { Head, Link } from '@inertiajs/react';

type Props = {
    blogs: Blog[];
};

const BlogsIndex = ({ blogs }: Props) => {
    return (
        <AppPublicLayout>
            <Head title="Blogs" />

            <Wrapper className="grid grid-cols-1 gap-6 py-6 md:grid-cols-3 pt-26">
                {blogs.map((blog) => {
                    console.log(blog.cover_img);
                    return (
                        <Link key={blog.id} href={route('public.blogs.show', blog.id)}>
                            <Card className="h-full py-4">
                                <CardHeader className="flex items-center justify-center px-4">
                                    <img
                                        src={blog.cover_img || '/images/blog-placeholder.jpg'}
                                        alt=""
                                        className="h-40 w-full rounded-md object-cover"
                                    />
                                </CardHeader>

                                <CardContent className="flex flex-col gap-2">
                                    <h3 className="text-lg font-semibold">{blog.title}</h3>

                                    <div className="flex gap-2">
                                        <Badge>{blog.date.split(' ')[0]}</Badge>
                                        <Badge>{blog.category}</Badge>
                                    </div>

                                    <div
                                        className="line-clamp-2 text-justify text-muted-foreground"
                                        dangerouslySetInnerHTML={{ __html: blog.contents[0].paragraph }}
                                    />
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </Wrapper>
        </AppPublicLayout>
    );
};

export default BlogsIndex;
