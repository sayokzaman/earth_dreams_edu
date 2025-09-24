type Content = {
    type: 'text' | 'video';
    id: string;
    section: string;
    title?: string;
    paragraph?: string[];
    video_url?: string;
};

export interface Blog {
    id: number;
    author_id: number;
    date: string;
    title: string;
    cover_img: string;
    category: string;
    contents: Content[];
    author?: User;
}
