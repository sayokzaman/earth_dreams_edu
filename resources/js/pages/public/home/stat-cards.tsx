import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

const StatCards = () => {
    return (
        <section className="relative flex flex-col gap-16 md:flex-row">
            {/* Text Column */}
            <div className="flex flex-col justify-center space-y-6 sm:w-1/2 sm:pr-12">
                <p className="text-primary-200 text-lg font-medium tracking-widest uppercase">Want to study in the UK?</p>
                <h1 className="text-4xl leading-tight font-extrabold sm:text-5xl">
                    Get ahead with <span className="text-theme-secondary">EDEC!</span>
                </h1>
                <p className="text-base leading-relaxed text-gray-300">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores suscipit animi est aperiam quaerat sit aliquid quasi.
                    Dolorem, necessitatibus molestiae.
                </p>

                <Link href="/" className="pt-4">
                    <Button size="lg" className="rounded-full shadow-lg">
                        Start Your Journey <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>

            {/* Card Grid */}
            <div className="grid gap-6 sm:grid-cols-2 md:w-1/2 md:grid-cols-1 lg:grid-cols-2">
                <Card className="relative flex justify-end overflow-hidden rounded-2xl border-none bg-transparent p-0 shadow-lg transition-transform duration-300">
                    <img
                        src="/images/stat_card_1.jpg"
                        alt="Partner Universities"
                        className="absolute inset-0 h-full w-full object-cover brightness-75"
                        loading="lazy"
                    />
                    <div className="relative z-5 rounded-2xl bg-white/30 p-6 backdrop-blur-sm sm:mt-46">
                        <CardContent className="space-y-2">
                            <h2 className="text-lg font-semibold text-gray-100">Partner Universities</h2>
                            <p className="text-4xl font-extrabold tracking-wider text-white">100+</p>
                        </CardContent>
                        <CardFooter className="pt-4">
                            <Link href={route('public.universities.index')} className="w-full">
                                <Button variant="secondary" className="w-full rounded-full">
                                    Explore <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardFooter>
                    </div>
                </Card>

                <Card className="relative flex justify-end overflow-hidden rounded-2xl border-none bg-transparent p-0 shadow-lg transition-transform duration-300">
                    <img
                        src="/images/stat_card_2.jpg"
                        alt="Partner Universities"
                        className="absolute inset-0 h-full w-full object-cover brightness-75"
                        loading="lazy"
                    />
                    <div className="relative z-5 rounded-2xl bg-white/30 p-6 backdrop-blur-sm sm:mt-46">
                        <CardContent className="space-y-2">
                            <h2 className="text-lg font-semibold text-gray-100">Students Guided</h2>
                            <p className="text-4xl font-extrabold tracking-wider text-white">10,000+</p>
                        </CardContent>
                        <CardFooter className="pt-4">
                            <Link href={route('public.study.index')} className="w-full">
                                <Button variant="secondary" className="w-full rounded-full">
                                    Read More <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardFooter>
                    </div>
                </Card>

                <Card className="relative flex justify-end overflow-hidden rounded-2xl border-none bg-transparent p-0 shadow-lg transition-transform duration-300">
                    <img
                        src="/images/stat_card_3.jpg"
                        alt="Partner Universities"
                        className="absolute inset-0 h-full w-full object-cover brightness-75"
                        loading="lazy"
                    />
                    <div className="relative z-5 rounded-2xl bg-white/30 p-6 backdrop-blur-sm sm:mt-46">
                        <CardContent className="space-y-2">
                            <h2 className="text-lg font-semibold text-gray-100">Years of Experience</h2>
                            <p className="text-4xl font-extrabold tracking-wider text-white">20+</p>
                        </CardContent>
                        <CardFooter className="pt-4">
                            <Link href={route('public.information.aboutUs')} className="w-full">
                                <Button variant="secondary" className="w-full rounded-full">
                                    About Us <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardFooter>
                    </div>
                </Card>

                <Card className="relative flex justify-end overflow-hidden rounded-2xl border-none bg-transparent p-0 shadow-lg transition-transform duration-300">
                    <img
                        src="/images/stat_card_4.jpg"
                        alt="Partner Universities"
                        className="absolute inset-0 h-full w-full object-cover brightness-75"
                        loading="lazy"
                    />
                    <div className="relative z-5 rounded-2xl bg-white/30 p-6 backdrop-blur-sm sm:mt-46">
                        <CardContent className="space-y-2">
                            <h2 className="text-lg font-semibold text-gray-100">Trained Counsellors</h2>
                            <p className="text-4xl font-extrabold tracking-wider text-white">50+</p>
                        </CardContent>
                        <CardFooter className="pt-4">
                            <Link href={route('public.consultation.index')} className="w-full">
                                <Button variant="secondary" className="w-full rounded-full">
                                    Get in Touch <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardFooter>
                    </div>
                </Card>
            </div>
        </section>
    );
};

export default StatCards;
