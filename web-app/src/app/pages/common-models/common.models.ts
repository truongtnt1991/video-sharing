export interface Video {
  videos: VideoItem[];
}
export interface VideoItem {
  id: number;
  url: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  videoInfo: any;
  embedUrl: string;
  User: {
    id: number;
    fullName: string;
  };
  Votes: [
    {
      id: number;
      type: string;
      userId: number;
    }
  ];
}

export interface Menu {
  title: string;
  url: string;
  imgSrc?: string;
  icon?: string;
}
