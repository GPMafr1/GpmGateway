export interface ISociete {
  id?: number;
  raisonSociale?: string;
  raisonSocialeAbrege?: string;
  identifiantUnique?: string;
  registreCommerce?: string;
  codeArticle?: string;
  adresse?: string;
  codePostal?: string;
  pays?: string;
  telephone?: string;
  fax?: string;
  email?: string;
}

export class Societe implements ISociete {
  constructor(
    public id?: number,
    public raisonSociale?: string,
    public raisonSocialeAbrege?: string,
    public identifiantUnique?: string,
    public registreCommerce?: string,
    public codeArticle?: string,
    public adresse?: string,
    public codePostal?: string,
    public pays?: string,
    public telephone?: string,
    public fax?: string,
    public email?: string
  ) {}
}
