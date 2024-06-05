export type Route = {
  back: any;
  courier: string;
  id: number;
  region: string;
  start: string;
  toregion: string;
};

export type CreateRoute = {
  inRegion: string;
  who: number;
  start: string;
  toRegion: string;
  back: string;
};
