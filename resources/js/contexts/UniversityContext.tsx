import { University } from '@/types/university';
import axios from 'axios';
import { createContext, ReactNode, useContext, useState } from 'react';

interface UniversityContextType {
    featuredUniversities: University[];
    loading: boolean;
    fetchUniversities: () => Promise<void>;
}

const UniversityContext = createContext<UniversityContextType | undefined>(undefined);

export function UniversityProvider({ children }: { children: ReactNode }) {
    const [featuredUniversities, setFeaturedUniversities] = useState<University[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    const fetchUniversities = async () => {
        if (hasFetched) return; // Don't refetch if already fetched

        setLoading(true);
        try {
            const res = await axios.get(route('public.universities.list'), { params: { query: '' } });
            setFeaturedUniversities(res.data ?? []);
            setHasFetched(true);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return <UniversityContext.Provider value={{ featuredUniversities, loading, fetchUniversities }}>{children}</UniversityContext.Provider>;
}

export function useUniversities() {
    const context = useContext(UniversityContext);
    if (!context) {
        throw new Error('useUniversities must be used within UniversityProvider');
    }
    return context;
}
