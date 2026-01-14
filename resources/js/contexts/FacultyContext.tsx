import { Faculty } from '@/types/faculty';
import axios from 'axios';
import { createContext, ReactNode, useContext, useState } from 'react';

interface FacultyContextType {
    featuredFaculties: Faculty[];
    loading: boolean;
    fetchFaculties: () => Promise<void>;
}

const FacultyContext = createContext<FacultyContextType | undefined>(undefined);

export function FacultyProvider({ children }: { children: ReactNode }) {
    const [featuredFaculties, setFeaturedFaculties] = useState<Faculty[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    const fetchFaculties = async () => {
        if (hasFetched) return; // Don't refetch if already fetched

        setLoading(true);
        try {
            const res = await axios.get(route('public.faculties.list'), { params: { query: '' } });
            setFeaturedFaculties(res.data ?? []);
            setHasFetched(true);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return <FacultyContext.Provider value={{ featuredFaculties, loading, fetchFaculties }}>{children}</FacultyContext.Provider>;
}

export function useFaculties() {
    const context = useContext(FacultyContext);
    if (!context) {
        throw new Error('useFaculties must be used within FacultyProvider');
    }
    return context;
}
