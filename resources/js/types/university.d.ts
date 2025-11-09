export interface UniversityContent {
    type: 'text' | 'video';
    section: string;
    heading: string;
    paragraph: string;
    video_url: string;
}

export interface University {
    id: number;
    name: string;
    cover: string;
    logo: string;
    location: string;
    location_url: string;
    founded: string;
    guardian_ranking: string;
    world_ranking: string;
    qs_ranking: string;
    scholarship: string;
    contents?: UniversityContent[];
    created_at: string;
    updated_at: string;
}
