import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Wrapper from '@/components/wrapper';
import { Link } from '@inertiajs/react';
import { ListIcon } from 'lucide-react';

const data = [
    {
        name: 'Business & Management',
        image: '/images/popular_faculties/business.svg',
    },
    {
        name: 'Computing',
        image: '/images/popular_faculties/computing.svg',
    },
    {
        name: 'Engineering',
        image: '/images/popular_faculties/engineering.svg',
    },
    {
        name: 'Law',
        image: '/images/popular_faculties/law.svg',
    },
    {
        name: 'Architecture',
        image: '/images/popular_faculties/architecture.svg',
    },
    {
        name: 'Medicine & Health',
        image: '/images/popular_faculties/computing.svg',
    },
    {
        name: 'Psychology',
        image: '/images/popular_faculties/engineering.svg',
    },
    {
        name: 'Law',
        image: '/images/popular_faculties/law.svg',
    },
];

const PopularFaculties = () => {
    return (
        <div className="relative">
            <img src={`/popular-faculties.jpg`} alt={'student essentials uk'} className="absolute inset-0 h-full w-full object-cover" />

            <Wrapper className="flex flex-col items-center justify-center gap-16 bg-accent-foreground/50 py-12 backdrop-blur-xs sm:py-20">
                <div className="flex w-full flex-col items-center gap-2 sm:gap-4">
                    <h1 className="text-center text-3xl font-extrabold tracking-tight text-secondary capitalize drop-shadow sm:text-4xl xl:text-5xl">
                        Popular <span className="text-theme-accent">Faculties</span> in the <span className="text-theme-secondary">UK</span>
                    </h1>
                    <p className="max-w-3xl text-center text-muted/80 drop-shadow sm:text-xl">
                        Study globally recognized programs in business, engineering, arts, and health. Build skills that stand out anywhere in the
                        world.
                    </p>
                </div>

                <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 lg:grid-cols-4">
                    {data.map((faculty) => (
                        <Card
                            key={faculty.name}
                            className="group flex cursor-pointer flex-col items-center justify-center gap-3 border-none bg-black/30 shadow-md transition-transform hover:scale-105"
                        >
                            <CardContent className="flex items-center justify-center transition-transform group-hover:scale-110">
                                <img src={faculty.image} alt={faculty.name} className="h-32" />
                            </CardContent>

                            <CardFooter>
                                <p className="text-center text-lg font-semibold tracking-wide text-white">{faculty.name}</p>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <Link href={route('public.courses.index')}>
                    <Button variant="secondary" className="h-12 min-w-[15rem] rounded-3xl text-lg font-semibold shadow-lg hover:shadow-xl">
                        <ListIcon className="size-5" />
                        Explore More
                    </Button>
                </Link>
            </Wrapper>
        </div>
    );
};

export default PopularFaculties;
