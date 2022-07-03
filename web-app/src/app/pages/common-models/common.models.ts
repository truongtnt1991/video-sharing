export interface Video {
  id: number;
  url: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Menu {
  title: string;
  url: string;
  imgSrc: string;
}
