import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IChargeSalariale } from 'app/shared/model/ressourceService/charge-salariale.model';

type EntityResponseType = HttpResponse<IChargeSalariale>;
type EntityArrayResponseType = HttpResponse<IChargeSalariale[]>;

@Injectable({ providedIn: 'root' })
export class ChargeSalarialeService {
  public resourceUrl = SERVER_API_URL + 'services/ressourceservice/api/charge-salariales';

  constructor(protected http: HttpClient) {}

  create(chargeSalariale: IChargeSalariale): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chargeSalariale);
    return this.http
      .post<IChargeSalariale>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(chargeSalariale: IChargeSalariale): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chargeSalariale);
    return this.http
      .put<IChargeSalariale>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IChargeSalariale>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IChargeSalariale[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(chargeSalariale: IChargeSalariale): IChargeSalariale {
    const copy: IChargeSalariale = Object.assign({}, chargeSalariale, {
      date: chargeSalariale.date && chargeSalariale.date.isValid() ? chargeSalariale.date.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((chargeSalariale: IChargeSalariale) => {
        chargeSalariale.date = chargeSalariale.date ? moment(chargeSalariale.date) : undefined;
      });
    }
    return res;
  }
}
