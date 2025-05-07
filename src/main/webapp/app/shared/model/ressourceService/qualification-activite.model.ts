import { Qualification } from 'app/shared/model/enumerations/qualification.model';

export interface IQualificationActivite {
  id?: number;
  code?: string;
  designation?: string;
  niveau?: Qualification;
}

export class QualificationActivite implements IQualificationActivite {
  constructor(public id?: number, public code?: string, public designation?: string, public niveau?: Qualification) {}
}
