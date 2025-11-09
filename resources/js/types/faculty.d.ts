import { Course } from '@/types/course';

export interface Faculty {
    id: number;
    name: string;
    courses?: Course[];
    course_count: number;
    created_at: string;
    updated_at: string;
}
