export interface IPieceJointe {
  id?: number;
  nom?: string;
  type?: string;
  contenuContentType?: string;
  contenu?: any;
}

export class PieceJointe implements IPieceJointe {
  constructor(public id?: number, public nom?: string, public type?: string, public contenuContentType?: string, public contenu?: any) {}
}
