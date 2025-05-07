import { Moment } from 'moment';

export interface IWorkOrder {
  id?: number;
  demandeur?: string;
  motif?: string;
  dateHeureDebutPrevisionnel?: Moment;
  dateHeureFinPrevisionnel?: Moment;
  dateHeureDebutReel?: Moment;
  dateHeureFinReel?: Moment;
  materielUtilise?: string;
  remarque?: string;
  numeroFicheIntervention?: string;
  hebergement?: number;
}

export class WorkOrder implements IWorkOrder {
  constructor(
    public id?: number,
    public demandeur?: string,
    public motif?: string,
    public dateHeureDebutPrevisionnel?: Moment,
    public dateHeureFinPrevisionnel?: Moment,
    public dateHeureDebutReel?: Moment,
    public dateHeureFinReel?: Moment,
    public materielUtilise?: string,
    public remarque?: string,
    public numeroFicheIntervention?: string,
    public hebergement?: number
  ) {}
}
