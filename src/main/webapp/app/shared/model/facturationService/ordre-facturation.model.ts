import { Moment } from 'moment';

export interface IOrdreFacturation {
  id?: number;
  devis?: string;
  bonDeCommande?: string;
  numeroFacture?: string;
  montantFacture?: number;
  dateFacture?: Moment;
  dateEcheance?: Moment;
  dateDecharge?: Moment;
}

export class OrdreFacturation implements IOrdreFacturation {
  constructor(
    public id?: number,
    public devis?: string,
    public bonDeCommande?: string,
    public numeroFacture?: string,
    public montantFacture?: number,
    public dateFacture?: Moment,
    public dateEcheance?: Moment,
    public dateDecharge?: Moment
  ) {}
}
