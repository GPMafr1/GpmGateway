import { Moment } from 'moment';

export interface IChargeFixeVehicule {
  id?: number;
  date?: Moment;
  valeur?: number;
}

export class ChargeFixeVehicule implements IChargeFixeVehicule {
  constructor(public id?: number, public date?: Moment, public valeur?: number) {}
}
