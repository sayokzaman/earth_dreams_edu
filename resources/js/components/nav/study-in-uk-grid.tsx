import { Link } from '@inertiajs/react'

export default function StudyInUKGrid() {
    const studyInUK = [
        {
            img: '/images/study-in-uk/why-study-in-uk.svg',
            title: 'Why Study in the UK',
            href: route('public.study.whyStudyInUK'),
            description: 'Explore the benefits and opportunities of studying in the UK.',
        },
        {
            img: '/images/study-in-uk/what-can-i-study.svg',
            title: 'What can I Study',
            href: route('public.study.canStudy'),
            description: 'Discover the wide range of courses and programs available for international students in the UK.',
        },
        {
            img: '/images/study-in-uk/january-intake.svg',
            title: 'January Intake',
            href: route('public.study.intake.january'),
            description: 'Learn about the January intake options for international students in the UK.',
        },
        {
            img: '/images/study-in-uk/may-intake.svg',
            title: 'May Intake',
            href: route('public.study.intake.may'),
            description: 'Find out about the May intake options for international students in the UK.',
        },
        {
            img: '/images/study-in-uk/september-intake.svg',
            title: 'September Intake',
            href: route('public.study.intake.september'),
            description: 'Explore the September intake options for international students in the UK.',
        },
        {
            img: '/images/study-in-uk/cost-of-study.svg',
            title: 'Cost of Study',
            href: route('public.study.costOfStudy'),
            description: 'Get a clear understanding of the cost of studying in the UK for international students.',
        },
        {
            img: '/images/study-in-uk/ucas.svg',
            title: 'UCAS',
            href: route('public.study.ucas'),
            description: 'Learn about the UCAS application process for international students applying to UK universities.',
        },
        {
            img: '/images/study-in-uk/student-essentials.svg',
            title: 'Student Essentials',
            href: route('public.study.studentEssentials'),
            description: 'Find out about the essential information and resources for international students studying in the UK.',
        },
    ];

    return (
        <div className="grid w-[72vw] grid-cols-2 gap-1 p-4">
            {studyInUK.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-6 rounded-lg px-4 py-2 transition-transform duration-200 ease-in-out hover:bg-white"
                >
                    <img src={item.img} alt="" className="h-16 w-16" />
                    <div>
                        <div className="mb-1 h-1 w-10 rounded-full bg-gradient-to-r from-theme to-theme-secondary" />

                        <h2 className="w-fit bg-gradient-to-r from-theme to-theme-secondary bg-clip-text text-lg font-bold text-transparent">
                            {item.title}
                        </h2>
                        {/* <h3 className="mb-2 text-lg font-semibold">{item.title}</h3> */}
                        <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}