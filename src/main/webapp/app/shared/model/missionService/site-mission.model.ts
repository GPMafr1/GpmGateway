import { Moment } from 'moment';

export interface ISiteMission {
  id?: number;
  code?: string;
  commentaire?: string;
  dateHeureDebutReel?: Moment;
  dateHeureFinReel?: Moment;
}

export class SiteMission implements ISiteMission {
  constructor(
    public id?: number,
    public code?: string,
    public commentaire?: string,
    public dateHeureDebutReel?: Moment,
    public dateHeureFinReel?: Moment
  ) {}
}
