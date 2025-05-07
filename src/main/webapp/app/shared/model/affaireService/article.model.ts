export interface IArticle {
  id?: number;
  code?: string;
  designation?: string;
  uniteDeMessure?: string;
  quantiteContractuelle?: number;
  quantiteRealisee?: number;
}

export class Article implements IArticle {
  constructor(
    public id?: number,
    public code?: string,
    public designation?: string,
    public uniteDeMessure?: string,
    public quantiteContractuelle?: number,
    public quantiteRealisee?: number
  ) {}
}
