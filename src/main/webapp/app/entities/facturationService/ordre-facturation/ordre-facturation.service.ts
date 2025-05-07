import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOrdreFacturation } from 'app/shared/model/facturationService/ordre-facturation.model';

type EntityResponseType = HttpResponse<IOrdreFacturation>;
type EntityArrayResponseType = HttpResponse<IOrdreFacturation[]>;

@Injectable({ providedIn: 'root' })
export class OrdreFacturationService {
  public resourceUrl = SERVER_API_URL + 'services/facturationservice/api/ordre-facturations';

  constructor(protected http: HttpClient) {}

  create(ordreFacturation: IOrdreFacturation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ordreFacturation);
    return this.http
      .post<IOrdreFacturation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(ordreFacturation: IOrdreFacturation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ordreFacturation);
    return this.http
      .put<IOrdreFacturation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOrdreFacturation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOrdreFacturation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(ordreFacturation: IOrdreFacturation): IOrdreFacturation {
    const copy: IOrdreFacturation = Object.assign({}, ordreFacturation, {
      dateFacture:
        ordreFacturation.dateFacture && ordreFacturation.dateFacture.isValid()
          ? ordreFacturation.dateFacture.format(DATE_FORMAT)
          : undefined,
      dateEcheance:
        ordreFacturation.dateEcheance && ordreFacturation.dateEcheance.isValid()
          ? ordreFacturation.dateEcheance.format(DATE_FORMAT)
          : undefined,
      dateDecharge:
        ordreFacturation.dateDecharge && ordreFacturation.dateDecharge.isValid()
          ? ordreFacturation.dateDecharge.format(DATE_FORMAT)
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateFacture = res.body.dateFacture ? moment(res.body.dateFacture) : undefined;
      res.body.dateEcheance = res.body.dateEcheance ? moment(res.body.dateEcheance) : undefined;
      res.body.dateDecharge = res.body.dateDecharge ? moment(res.body.dateDecharge) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((ordreFacturation: IOrdreFacturation) => {
        ordreFacturation.dateFacture = ordreFacturation.dateFacture ? moment(ordreFacturation.dateFacture) : undefined;
        ordreFacturation.dateEcheance = ordreFacturation.dateEcheance ? moment(ordreFacturation.dateEcheance) : undefined;
        ordreFacturation.dateDecharge = ordreFacturation.dateDecharge ? moment(ordreFacturation.dateDecharge) : undefined;
      });
    }
    return res;
  }
}
