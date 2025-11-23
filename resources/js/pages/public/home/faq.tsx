import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const items = [
    {
        question: 'What kind of Universities do we work with?',
        answer: `We work closely with a wide range of different universities from around the UK, so we are in a great position to help find the
        perfect course for you. Whether you’re looking to study at a prestigious Russel Group University or would prefer something
        more creative, we’ll find the best options available.`,
    },
    {
        question: 'How many students have we advised?',
        answer: `We have advised almost 4.5 million students about studying in the UK.`,
    },
    {
        question: 'Why study in the UK?',
        answer: `The UK is well known globally for its excellent education system, with many of its universities ranking in the top 100
        globally. The UK is also known for its diverse and welcoming population, making it a fantastic place to study.`,
    },
    {
        question: 'Is there any cost required with EDEC consultancy services?',
        answer: `At EDEC, we provide a range of services to support international students on their journey to studying in the UK, and best of
        all, it’s completely free.`,
    },
    {
        question: 'What services does an educational consultant provide?',
        answer: `An educational consultant provides a variety of different services to students, such as educational testing and assessment,
        recommendations for academic programmes, assistance with the university application process, and advice on scholarship
        options.`,
    },
];

export function LandingPageFAQ() {
    const [selected, setSelected] = useState('');

    return (
        <div>
            <div className="mb-8 flex flex-col items-center justify-between gap-4">
                <h1 className="text-center text-3xl font-extrabold tracking-tight capitalize drop-shadow-sm sm:text-4xl">
                    Frequently Asked <span className="text-theme-accent/90">Questions</span> <span className="text-theme-secondary/80">(FAQs)</span>
                </h1>

                <p className="max-w-3xl text-center text-theme-foreground sm:text-xl">
                    Find answers to the most common questions about studying abroad with Earth Dreams Edu. If you have more questions, our expert
                    consultants are here to help.
                </p>
            </div>

            <div className="flex items-center justify-between gap-6">
                <div className="hidden w-1/2 items-center justify-center overflow-hidden lg:flex">
                    <img src="/images/faq.jpg" alt="" className="aspect-square w-2/3 rounded-full object-cover shadow-lg" />
                </div>

                <Accordion
                    value={selected}
                    onValueChange={setSelected}
                    type="single"
                    collapsible
                    className="h-fit w-full overflow-hidden rounded-xl bg-card shadow-md lg:w-1/2"
                >
                    {items.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index + 1}`} className="border-b last:border-0">
                            <AccordionTrigger
                                className={cn(
                                    'cursor-pointer px-6 py-6 text-start font-semibold text-accent-foreground drop-shadow hover:no-underline',
                                    selected === `item-${index + 1}` && 'bg-theme/80 text-white',
                                )}
                            >
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pt-4">
                                <p className="text-theme-foreground/90">{item.answer}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}
