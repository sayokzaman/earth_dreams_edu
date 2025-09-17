import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Wrapper from '@/components/wrapper';

const NewsLetter = () => {
    return (
        <Wrapper className="flex flex-col items-center justify-center gap-2 bg-white py-12">
            <h1 className="text-xl font-bold sm:text-2xl">
                Stay Updated with <span className="text-theme-secondary">EDEC</span>
            </h1>
            <p className="text-center text-muted-foreground sm:text-lg">
                Join our newsletter for the latest updates, insights, and special offers. Don't miss out on any of our exciting news!
            </p>
            <div className="mt-4 flex w-full flex-col justify-center gap-4 sm:flex-row">
                <Input type="email" placeholder="Enter your email address" className="h-10 w-full rounded-3xl sm:w-lg" />
                <Button className="h-10 rounded-3xl">Subscribe</Button>
            </div>
        </Wrapper>
    );
};

export default NewsLetter;
