import { Moment } from 'moment';

export interface ITauxConsommationVehicule {
  id?: number;
  date?: Moment;
  valeur?: number;
}

export class TauxConsommationVehicule implements ITauxConsommationVehicule {
  constructor(public id?: number, public date?: Moment, public valeur?: number) {}
}
