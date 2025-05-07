import { TypeAttributEmploye } from 'app/shared/model/enumerations/type-attribut-employe.model';

export interface IEmploye {
  id?: number;
  matricule?: string;
  prenomNom?: string;
  attribut?: TypeAttributEmploye;
  chefProjet?: boolean;
  numeroPermis?: string;
  numeroCIN?: string;
}

export class Employe implements IEmploye {
  constructor(
    public id?: number,
    public matricule?: string,
    public prenomNom?: string,
    public attribut?: TypeAttributEmploye,
    public chefProjet?: boolean,
    public numeroPermis?: string,
    public numeroCIN?: string
  ) {
    this.chefProjet = this.chefProjet || false;
  }
}
