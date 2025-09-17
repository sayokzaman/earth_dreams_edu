import { Button } from '@/components/ui/button';
import Wrapper from '@/components/wrapper';
import { SearchTabs } from '@/pages/public/home/search-tabs';

const HeroSection = () => {
    return (
        <div className="relative">
            <img src="/images/edec_hero_2.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
            <Wrapper className="relative bg-gradient-to-b from-accent-foreground/10 from-40% to-accent-foreground">
                <div className="flex w-full flex-col gap-8 pt-40 pb-24 text-gray-100 sm:gap-6 sm:pt-56 sm:pb-16">
                    <div className="flex flex-col">
                        <p className="bg-gradient-to-r from-gray-300 to-gray-700 bg-clip-text pb-1 text-xl font-semibold text-transparent sm:text-3xl">
                            Welcome
                        </p>
                        <div>
                            <p className="leading-tighter h-full text-4xl font-extrabold tracking-widest sm:text-7xl">
                                <span className="text-theme-accent">EARTH</span> <span className="text-theme-secondary">DREAMS</span>
                            </p>
                            <span className="text-xl leading-tight font-extrabold sm:text-4xl">Education & Consultancy</span>
                        </div>
                    </div>

                    <div className="flex justify-start gap-4">
                        <Button className="sm:text-md rounded-3xl font-bold sm:h-12 sm:text-base">Apply Now</Button>
                        <Button className="sm:text-md rounded-3xl font-bold sm:h-12 sm:text-base" variant="secondary">
                            Free Consultancy
                        </Button>
                    </div>
                </div>

                <SearchTabs className="max-w-4xl" />
            </Wrapper>
        </div>
    );
};

export default HeroSection;
