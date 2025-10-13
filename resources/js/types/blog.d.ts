type Content = {
    type: 'text' | 'video';
    section: string;
    heading: string;
    paragraph: string;
    video_url: string;
};

export interface Blog {
    id: number;
    author_id: number;
    type: string;
    title: string;
    date: string;
    cover_img: string;
    category: string;
    contents: Content[];
    author?: User;
}
