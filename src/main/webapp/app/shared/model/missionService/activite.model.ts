import { TypeActivite } from 'app/shared/model/enumerations/type-activite.model';

export interface IActivite {
  id?: number;
  code?: string;
  designation?: string;
  type?: TypeActivite;
}

export class Activite implements IActivite {
  constructor(public id?: number, public code?: string, public designation?: string, public type?: TypeActivite) {}
}
