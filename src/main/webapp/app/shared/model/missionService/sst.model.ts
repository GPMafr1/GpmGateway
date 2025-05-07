import { Moment } from 'moment';
import { ImportanceSST } from 'app/shared/model/enumerations/importance-sst.model';

export interface ISST {
  id?: number;
  label?: string;
  date?: Moment;
  importance?: ImportanceSST;
  commentaire?: string;
}

export class SST implements ISST {
  constructor(
    public id?: number,
    public label?: string,
    public date?: Moment,
    public importance?: ImportanceSST,
    public commentaire?: string
  ) {}
}
