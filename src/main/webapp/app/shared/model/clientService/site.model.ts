export interface ISite {
  id?: number;
  code?: string;
  designation?: string;
  ville?: string;
  gpsX?: number;
  gpsY?: number;
}

export class Site implements ISite {
  constructor(
    public id?: number,
    public code?: string,
    public designation?: string,
    public ville?: string,
    public gpsX?: number,
    public gpsY?: number
  ) {}
}
