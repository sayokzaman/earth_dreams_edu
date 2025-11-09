import { Faculty } from '@/types/faculty';

export interface CourseContent {
    type: 'text' | 'video';
    section: string;
    heading: string;
    paragraph: string;
    video_url: string;
}

export interface Course {
    id: number;
    title: string;
    faculty_id: number;
    study_level: string;
    duration_months: number;
    duration: number;
    duration_unit: 'months' | 'years';
    cover: string;
    contents: CourseContent[];
    faculty?: Faculty;
    created_at: string;
    updated_at: string;
}
