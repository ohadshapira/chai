export enum EPinType {
  Picture = 'picture',
  Missing = 'missing',
  Chat = 'chat',
  Video = 'video'
}

export interface IPin {
  author: string | string[];
  username: string | string[];
  city: string;
  country: string;
  coordinates: [number, number];
  date: string;
  photo: string;
  type?: EPinType;
  streetview?: string;
  assistant_id?: string;
}
