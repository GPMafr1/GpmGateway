import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFraisMission } from 'app/shared/model/facturationService/frais-mission.model';

type EntityResponseType = HttpResponse<IFraisMission>;
type EntityArrayResponseType = HttpResponse<IFraisMission[]>;

@Injectable({ providedIn: 'root' })
export class FraisMissionService {
  public resourceUrl = SERVER_API_URL + 'services/facturationservice/api/frais-missions';

  constructor(protected http: HttpClient) {}

  create(fraisMission: IFraisMission): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fraisMission);
    return this.http
      .post<IFraisMission>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(fraisMission: IFraisMission): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fraisMission);
    return this.http
      .put<IFraisMission>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFraisMission>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFraisMission[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(fraisMission: IFraisMission): IFraisMission {
    const copy: IFraisMission = Object.assign({}, fraisMission, {
      dateDebut: fraisMission.dateDebut && fraisMission.dateDebut.isValid() ? fraisMission.dateDebut.format(DATE_FORMAT) : undefined,
      dateFin: fraisMission.dateFin && fraisMission.dateFin.isValid() ? fraisMission.dateFin.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateDebut = res.body.dateDebut ? moment(res.body.dateDebut) : undefined;
      res.body.dateFin = res.body.dateFin ? moment(res.body.dateFin) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((fraisMission: IFraisMission) => {
        fraisMission.dateDebut = fraisMission.dateDebut ? moment(fraisMission.dateDebut) : undefined;
        fraisMission.dateFin = fraisMission.dateFin ? moment(fraisMission.dateFin) : undefined;
      });
    }
    return res;
  }
}
