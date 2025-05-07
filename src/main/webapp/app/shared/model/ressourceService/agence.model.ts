export interface IAgence {
  id?: number;
  designation?: string;
  adresse?: string;
  ville?: string;
  pays?: string;
}

export class Agence implements IAgence {
  constructor(public id?: number, public designation?: string, public adresse?: string, public ville?: string, public pays?: string) {}
}
