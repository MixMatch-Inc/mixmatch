export interface SocialLink {
    id: string;
    platform: 'instagram' | 'soundcloud' | 'spotify' | 'email';
    url: string;
    text: string;
}


export interface ProfileData {
    name: string;
    location: string;
    avatar: string;
    coverImage: string;
    tags: string[];
    description: string;
    socialLinks: SocialLink[];
}

export interface ImageItem {
    id: string;
    src: string;
    alt: string;
    index: number;
    type: 'video' | 'sample' | 'photo';
}

export interface ImageItemView {
    id: string;
    src: string;
    alt: string;
    height: string;
}

export interface ContentTab {
    value: string;
    label: string;
}
