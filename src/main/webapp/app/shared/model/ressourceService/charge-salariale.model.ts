import { Moment } from 'moment';

export interface IChargeSalariale {
  id?: number;
  date?: Moment;
  valeur?: number;
}

export class ChargeSalariale implements IChargeSalariale {
  constructor(public id?: number, public date?: Moment, public valeur?: number) {}
}
