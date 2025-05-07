export interface IArticleMission {
  id?: number;
  quantitePlanifiee?: number;
  quantiteUtilisee?: number;
}

export class ArticleMission implements IArticleMission {
  constructor(public id?: number, public quantitePlanifiee?: number, public quantiteUtilisee?: number) {}
}
