export interface IClient {
  id?: number;
  raisonSociale?: string;
  identifiantUnique?: string;
  adresse?: string;
  telephone?: string;
  fax?: string;
  email?: string;
  typeSites?: string;
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public raisonSociale?: string,
    public identifiantUnique?: string,
    public adresse?: string,
    public telephone?: string,
    public fax?: string,
    public email?: string,
    public typeSites?: string
  ) {}
}
