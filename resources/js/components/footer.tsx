import Wrapper from '@/components/wrapper';
import { Link } from '@inertiajs/react';
import { Facebook, Globe, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-theme text-white/60">
            <Wrapper className="mx-auto grid grid-cols-1 gap-10 px-6 py-12 md:grid-cols-4">
                {/* Brand */}
                <div className="space-y-4">
                    <div>
                        <img src="/images/edec.svg" alt="Logo" className="h-12 w-fit object-contain" />
                    </div>
                    <p className="text-sm text-zinc-400">Building smarter education & career solutions for the next generation.</p>
                    <div className="flex gap-4">
                        <Facebook className="h-5 w-5 cursor-pointer hover:text-white" />
                        <Instagram className="h-5 w-5 cursor-pointer hover:text-white" />
                        <Linkedin className="h-5 w-5 cursor-pointer hover:text-white" />
                        <Twitter className="h-5 w-5 cursor-pointer hover:text-white" />
                    </div>
                </div>

                {/* Explore */}
                <div>
                    <h4 className="mb-4 font-semibold text-white">Explore</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href={route('public.universities.index')} className="underline-offset-2 hover:text-white">
                                Find a University
                            </Link>
                        </li>
                        <li>
                            <Link href={route('public.courses.index')} className="underline-offset-2 hover:text-white">
                                Find a Course
                            </Link>
                        </li>
                        <li>
                            <Link href={route('public.blogs.index')} className="underline-offset-2 hover:text-white">
                                Latest Blogs & Events
                            </Link>
                        </li>
                        <li>
                            <Link href={route('public.study.index')} className="underline-offset-2 hover:text-white">
                                Student Resources
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Information */}
                <div>
                    <h4 className="mb-4 font-semibold text-white">Information</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link className="underline-offset-2 hover:text-white">About Us</Link>
                        </li>
                        <li>
                            <Link className="underline-offset-2 hover:text-white">How We Operate</Link>
                        </li>
                        <li>
                            <Link className="underline-offset-2 hover:text-white">Our Offices</Link>
                        </li>
                        <li>
                            <Link className="underline-offset-2 hover:text-white">Careers</Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="mb-4 font-semibold text-white">Contact</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2">
                            <Mail className="h-4 w-4" /> support@earthdreamsedu.com
                        </li>
                        <li className="flex items-center gap-2">
                            <Globe className="h-4 w-4" /> www.earthdreamsedu.com
                        </li>
                    </ul>
                </div>
            </Wrapper>

            {/* Bottom Bar */}
            <Wrapper className="border-t border-white/15">
                <div className="mx-auto flex flex-col items-center justify-between gap-3 py-6 text-sm text-white/50 md:flex-row">
                    <span>© 2025 - {new Date().getFullYear()} EDEC. All rights reserved.</span>
                    <span>
                        Powered by{' '}
                        <a
                            href="https://instantsolution.tech/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white underline-offset-2 hover:underline"
                        >
                            Instant Solutions
                        </a>
                        <img
                            src="/images/instant-solutions.jpg"
                            alt="Instant Solutions"
                            className="ml-1 inline h-6 w-6 rounded-full bg-white object-contain p-0.5"
                        />
                    </span>
                </div>
            </Wrapper>
        </footer>
    );
};

export default Footer;
