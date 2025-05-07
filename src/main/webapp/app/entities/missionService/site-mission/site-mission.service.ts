import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISiteMission } from 'app/shared/model/missionService/site-mission.model';

type EntityResponseType = HttpResponse<ISiteMission>;
type EntityArrayResponseType = HttpResponse<ISiteMission[]>;

@Injectable({ providedIn: 'root' })
export class SiteMissionService {
  public resourceUrl = SERVER_API_URL + 'services/missionservice/api/site-missions';

  constructor(protected http: HttpClient) {}

  create(siteMission: ISiteMission): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(siteMission);
    return this.http
      .post<ISiteMission>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(siteMission: ISiteMission): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(siteMission);
    return this.http
      .put<ISiteMission>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISiteMission>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISiteMission[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(siteMission: ISiteMission): ISiteMission {
    const copy: ISiteMission = Object.assign({}, siteMission, {
      dateHeureDebutReel:
        siteMission.dateHeureDebutReel && siteMission.dateHeureDebutReel.isValid() ? siteMission.dateHeureDebutReel.toJSON() : undefined,
      dateHeureFinReel:
        siteMission.dateHeureFinReel && siteMission.dateHeureFinReel.isValid() ? siteMission.dateHeureFinReel.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateHeureDebutReel = res.body.dateHeureDebutReel ? moment(res.body.dateHeureDebutReel) : undefined;
      res.body.dateHeureFinReel = res.body.dateHeureFinReel ? moment(res.body.dateHeureFinReel) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((siteMission: ISiteMission) => {
        siteMission.dateHeureDebutReel = siteMission.dateHeureDebutReel ? moment(siteMission.dateHeureDebutReel) : undefined;
        siteMission.dateHeureFinReel = siteMission.dateHeureFinReel ? moment(siteMission.dateHeureFinReel) : undefined;
      });
    }
    return res;
  }
}
