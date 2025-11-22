import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

type Step = {
    title: string;
    description: string[];
    image: string;
    action?: React.ReactNode;
};

const steps: Step[] = [
    {
        title: 'Get Our Guidance',
        description: [
            'Receive personalized, one-on-one advice from our expert counselors who understand your academic background, career goals, and preferred study destinations. We help you figure out exactly where you fit best.',
            'Our team evaluates your strengths and aspirations to map out the smartest path forward—saving you time, confusion, and unnecessary stress.',
        ],
        image: '/images/journey-steps/step-1.jpg',
    },
    {
        title: 'Shortlist Universities',
        description: [
            'We carefully analyze hundreds of global universities and shortlist the ones that perfectly match your academic profile, career interests, financial capacity, and country preferences. No random choices—only strategic ones.',
            'This ensures you focus on institutions where you have strong chances of admission, scholarships, and long-term opportunities.',
        ],
        image: '/images/journey-steps/step-2.jpg',
    },
    {
        title: 'Application & Document Review',
        description: [
            'From filling out forms to arranging transcripts, essays, portfolios, and academic documents—we guide you through every part of the application process. You’ll know exactly what to submit and how to submit it.',
            'Our support helps you avoid mistakes, stay organized, and submit polished applications that stand out from the rest.',
        ],
        image: '/images/journey-steps/step-3.jpg',
    },
    {
        title: 'SOP & LOR Review',
        description: [
            'Crafting the perfect SOP and LOR is crucial, and we help you build strong, impactful documents that reflect your story, achievements, and motivations clearly and confidently.',
            'We review your drafts, highlight improvements, and ensure your writing aligns with what top universities look for in successful applicants.',
        ],
        image: '/images/journey-steps/step-4.jpg',
    },
    {
        title: 'Scholarship Advice',
        description: [
            'Get expert insights on local and international scholarships, grants, and financial aid opportunities based on your profile. We guide you toward options with the highest success rate.',
            'You’ll also learn tips on improving your eligibility, preparing documents, and presenting yourself as a strong scholarship candidate.',
        ],
        image: '/images/journey-steps/step-5.jpg',
    },
    {
        title: 'Handpicked Offers',
        description: [
            'After evaluating your applications, we present you with curated university offers that match your academic goals, budget, and future career plans. Each offer is filtered for your success.',
            'Our counselors help you compare programs, rankings, tuition, post-study work options, and long-term career benefits—so you make the smartest choice.',
        ],
        image: '/images/journey-steps/step-6.jpg',
    },
    {
        title: 'Visa Assistance',
        description: [
            'We guide you through every step of the visa journey—document collection, financial proof requirements, interviews, appointments, and application submissions. Everything is made crystal clear.',
            'You’ll receive personalized tips to avoid rejections, handle tricky questions, and ensure your visa process runs smoothly from start to finish.',
        ],
        image: '/images/journey-steps/step-7.jpg',
    },
    {
        title: 'Accommodation Support',
        description: [
            'Finding a safe, comfortable place abroad can be stressful, so we help you choose the right accommodation that fits your lifestyle, budget, and preferences. From university housing to private rentals—we cover it all.',
            'We also share verified listings, safety checks, budgeting tips, and location insights, ensuring you feel at home from day one.',
        ],
        image: '/images/journey-steps/step-8.jpg',
    },
];

export function JourneyRoadmap() {
    return (
        <Carousel
            opts={{
                loop: true,
            }}
            plugins={[
                Autoplay({
                    delay: 2500, // speed (2.5 seconds)
                    stopOnInteraction: false,
                }),
            ]}
            className="relative w-full"
        >
            <CarouselContent>
                {steps.map((item, index) => (
                    <CarouselItem key={item.title} className="flex h-full gap-6">
                        <Card className="m-4 mx-auto grid aspect-auto h-full max-w-6xl gap-0 overflow-hidden rounded-2xl border p-0 shadow-lg md:grid-cols-2">
                            <div className="flex h-full items-center justify-center overflow-hidden bg-white">
                                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                            </div>
                            <CardContent className="flex h-full flex-col justify-center py-6 xl:pl-10">
                                <div className="flex flex-col">
                                    <div className="mb-2 h-1 w-14 rounded-full bg-gradient-to-r from-theme to-theme-secondary" />

                                    <h2 className="w-fit bg-gradient-to-r from-theme to-theme-secondary bg-clip-text text-3xl font-bold text-transparent">
                                        {index + 1}. {item.title}
                                    </h2>

                                    <div className="mt-4 flex flex-col gap-4 text-theme-foreground select-none xl:text-lg">
                                        {item.description.map((desc, index) => (
                                            <p key={index}>{desc}</p>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <div>
                <CarouselPrevious className="3xl:left-1/12 absolute top-full left-5/12 sm:top-1/2 sm:-left-10" />
                <CarouselNext className="3xl:right-1/12 absolute top-full right-5/12 sm:top-1/2 sm:-right-10" />
            </div>
        </Carousel>
    );
}
