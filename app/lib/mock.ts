import { ImageItem, ProfileData } from "../interfaces/pofile";


export const initialProfile: ProfileData = {
    name: "MIXER",
    location: "Los Angeles, CA",
    avatar: "/images/profile/main.png",
    coverImage: "/images/profile/background.png",
    tags: ['Pop', 'Electronic', 'Hip-hop'],
    description: "Elevate your party experience with DJ Beats Pro - the ultimate DJ app for mixing tracks and creating the perfect atmosphere for any event.",
    socialLinks: [
      { id: '1', platform: 'instagram', url: 'https://instagram.com/mixer', text: '@mixer' },
      { id: '2', platform: 'soundcloud', url: 'https://soundcloud.com/mixer', text: 'Mixes Vibe Master Mixes' },
      { id: '3', platform: 'spotify', url: 'https://spotify.com/mixer', text: 'DJ Vibe Master' },
      { id: '4', platform: 'email', url: 'mailto:djvibemaster@gmail.com', text: 'djvibemaster@gmail.com' },
    ]
  };
  
  export const initialMediaItems: ImageItem[] = [
    { 
      id: '1', 
      src: '/images/profile/image1.png', 
      alt: 'DJ Performance Night Club', 
      index: 0,
      type: 'video' 
    },
    { 
      id: '2', 
      src: '/images/profile/image2.png', 
      alt: 'Festival Performance', 
      index: 1,
      type: 'video' 
    },
    { 
      id: '3', 
      src: '/images/profile/image3.png', 
      alt: 'Concert Stage', 
      index: 2,
      type: 'video' 
    },
    { 
      id: '4', 
      src: '/images/profile/image4.png', 
      alt: 'DJ Set Performance', 
      index: 3, 
      type: 'video' 
    },
    { 
      id: '5', 
      src: '/images/profile/image5.png', 
      alt: 'Live Music Event', 
      index: 4, 
      type: 'video' 
    },
    { 
      id: '6', 
      src: '/images/profile/image6.png', 
      alt: 'Studio Session', 
      index: 5, 
      type: 'sample' 
    },
    { 
      id: '7', 
      src: '/images/profile/image7.png', 
      alt: 'Music Production', 
      index: 6, 
      type: 'sample' 
    },
    { 
      id: '8', 
      src: '/images/profile/image8.png', 
      alt: 'Mixing Console', 
      index: 7, 
      type: 'sample' 
    },
    { 
      id: '9', 
      src: '/images/profile/image9.png', 
      alt: 'Recording Session', 
      index: 8, 
      type: 'sample' 
    },
    { 
      id: '10', 
      src: '/images/profile/image3.png', 
      alt: 'Artist Portrait', 
      index: 9, 
      type: 'photo' 
    },
    { 
      id: '11', 
      src: '/images/profile/image1.png', 
      alt: 'Backstage Moment', 
      index: 10, 
      type: 'photo' 
    },
    { 
      id: '12', 
      src: '/images/profile/image7.png', 
      alt: 'Fan Interaction', 
      index: 11, 
      type: 'photo' 
    },
    { 
      id: '13', 
      src: '/images/profile/image9.png', 
      alt: 'Event Preparation', 
      index: 12, 
      type: 'photo' 
    },
    { 
      id: '14', 
      src: '/images/profile/image2.png', 
      alt: 'Stage Setup', 
      index: 13, 
      type: 'photo' 
    },
    { 
      id: '15', 
      src: '/images/profile/image5.png', 
      alt: 'Equipment Setup', 
      index: 14, 
      type: 'photo' 
    },
    { 
      id: '16', 
      src: '/images/profile/image8.png', 
      alt: 'Venue Overview', 
      index: 15, 
      type: 'photo' 
    },
    { 
      id: '17', 
      src: '/images/profile/image4.png', 
      alt: 'Crowd Interaction', 
      index: 16, 
      type: 'photo' 
    },
    { 
      id: '18', 
      src: '/images/profile/image1.png', 
      alt: 'DJ Performance', 
      index: 17, 
      type: 'photo' 
    },
    { 
      id: '19', 
      src: '/images/profile/image1.png', 
      alt: 'DJ Performance', 
      index: 18, 
      type: 'photo' 
    }
  ];