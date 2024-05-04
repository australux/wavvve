export type TAlbum = {
    id: string;
    name: string;
    artists: TArtist[];
    images: TImage[];
    img_s?: TImage;
    rating?: string;
    date?: string;
};

export type TArtist = {
    id: string;
    name: string;
};

export type TImage = {
    height: number;
    url: string;
    width: number;
};
