type BlogContent = {
    type: 'text' | 'video';
    section: string;
    heading: string;
    paragraph: string;
    video_url: string;
};

import { Category } from './category';

export interface Blog {
    id: number;
    author_id: number;
    type: string;
    title: string;
    date: string;
    cover_img: string;
    category_id: number;
    category?: Category;
    contents: BlogContent[];
    author?: User;
}
