import { Moment } from 'moment';
import { StatutAffaire } from 'app/shared/model/enumerations/statut-affaire.model';

export interface IAffaire {
  id?: number;
  numeroAffaire?: string;
  designationAffaire?: string;
  bonDeCommande?: string;
  montant?: number;
  devise?: string;
  dateDebut?: Moment;
  dateCloture?: Moment;
  datePassageExecution?: Moment;
  lieuMultipleParMission?: boolean;
  montantVente?: number;
  montantBudgetaireMateriel?: number;
  montantBudgetaireService?: number;
  statut?: StatutAffaire;
}

export class Affaire implements IAffaire {
  constructor(
    public id?: number,
    public numeroAffaire?: string,
    public designationAffaire?: string,
    public bonDeCommande?: string,
    public montant?: number,
    public devise?: string,
    public dateDebut?: Moment,
    public dateCloture?: Moment,
    public datePassageExecution?: Moment,
    public lieuMultipleParMission?: boolean,
    public montantVente?: number,
    public montantBudgetaireMateriel?: number,
    public montantBudgetaireService?: number,
    public statut?: StatutAffaire
  ) {
    this.lieuMultipleParMission = this.lieuMultipleParMission || false;
  }
}
