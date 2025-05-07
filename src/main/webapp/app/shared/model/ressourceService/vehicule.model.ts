import { Moment } from 'moment';
import { TypeCarburant } from 'app/shared/model/enumerations/type-carburant.model';

export interface IVehicule {
  id?: number;
  marque?: string;
  type?: string;
  matricule?: string;
  nbPlaces?: number;
  numeroCarteGrise?: string;
  dateCirculation?: Moment;
  typeCarburant?: TypeCarburant;
}

export class Vehicule implements IVehicule {
  constructor(
    public id?: number,
    public marque?: string,
    public type?: string,
    public matricule?: string,
    public nbPlaces?: number,
    public numeroCarteGrise?: string,
    public dateCirculation?: Moment,
    public typeCarburant?: TypeCarburant
  ) {}
}
