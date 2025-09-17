import Wrapper from '@/components/wrapper';
import { Link } from '@inertiajs/react';
import { FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react';

const Footer = () => {
    return (
        <Wrapper className="grid items-center gap-4 bg-theme py-6 sm:grid-cols-3">
            <div className="flex items-center justify-center sm:justify-start">
                <img src="/images/edec.svg" alt="Logo" className="h-12 w-fit object-contain" />
            </div>

            <div className="flex items-center justify-center gap-4">
                <Link>
                    <FacebookIcon className="text-gray-300" />
                </Link>
                <Link>
                    <InstagramIcon className="text-gray-300" />
                </Link>
                <Link>
                    <TwitterIcon className="text-gray-300" />
                </Link>
            </div>

            <div className="flex justify-center text-gray-300 sm:justify-end">&copy; 2025-26 EDEC All rights reserved.</div>
        </Wrapper>
    );
};

export default Footer;
