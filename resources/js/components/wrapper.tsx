import { cn } from '@/lib/utils';
import React from 'react';

const Wrapper = ({ children, className, ...props }: { children: React.ReactNode; className?: string; [props: string]: unknown }) => {
    return (
        <div {...props} className={cn('w-full px-5 sm:px-20 xl:px-32 2xl:px-52', className)}>
            {children}
        </div>
    );
};

export default Wrapper;
