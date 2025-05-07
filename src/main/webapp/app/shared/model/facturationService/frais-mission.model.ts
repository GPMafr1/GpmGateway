import { Moment } from 'moment';

export interface IFraisMission {
  id?: number;
  dateDebut?: Moment;
  dateFin?: Moment;
  montantTotal?: number;
  avanceRecue?: number;
  netAPayer?: number;
}

export class FraisMission implements IFraisMission {
  constructor(
    public id?: number,
    public dateDebut?: Moment,
    public dateFin?: Moment,
    public montantTotal?: number,
    public avanceRecue?: number,
    public netAPayer?: number
  ) {}
}
