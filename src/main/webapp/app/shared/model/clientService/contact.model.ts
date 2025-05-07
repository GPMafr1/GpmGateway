export interface IContact {
  id?: number;
  raisonSociale?: string;
  identifiantUnique?: string;
  adresse?: string;
  telephone?: string;
  fax?: string;
  email?: string;
}

export class Contact implements IContact {
  constructor(
    public id?: number,
    public raisonSociale?: string,
    public identifiantUnique?: string,
    public adresse?: string,
    public telephone?: string,
    public fax?: string,
    public email?: string
  ) {}
}
