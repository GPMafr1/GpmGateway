export interface ITache {
  id?: number;
  roleMission?: string;
  note?: string;
  remboursement?: number;
}

export class Tache implements ITache {
  constructor(public id?: number, public roleMission?: string, public note?: string, public remboursement?: number) {}
}
