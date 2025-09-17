import { cn } from '@/lib/utils';
import React from 'react';

const Wrapper = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <div className={cn('w-full px-5 sm:px-20 xl:px-52', className)}>{children}</div>;
};

export default Wrapper;
