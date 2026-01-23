import { useAppearance } from '@/hooks/use-appearance';
import { useEffect, useState } from 'react';

export default function AppLogo() {
    const { appearance } = useAppearance();

    const [source, setSource] = useState(appearance === 'dark' ? '/images/edec.svg' : '/images/edec_logo_light.svg');

    useEffect(() => {
        setSource(appearance === 'dark' ? '/images/edec.svg' : '/images/edec_light.svg');
    }, [appearance]);

    return (
        <div className="flex w-full justify-center">
            <img src={source} className="h-12 object-contain" alt="" />
        </div>
    );
}
