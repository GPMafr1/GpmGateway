import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISST } from 'app/shared/model/missionService/sst.model';

type EntityResponseType = HttpResponse<ISST>;
type EntityArrayResponseType = HttpResponse<ISST[]>;

@Injectable({ providedIn: 'root' })
export class SSTService {
  public resourceUrl = SERVER_API_URL + 'services/missionservice/api/ssts';

  constructor(protected http: HttpClient) {}

  create(sST: ISST): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sST);
    return this.http
      .post<ISST>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(sST: ISST): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sST);
    return this.http
      .put<ISST>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISST>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISST[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(sST: ISST): ISST {
    const copy: ISST = Object.assign({}, sST, {
      date: sST.date && sST.date.isValid() ? sST.date.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((sST: ISST) => {
        sST.date = sST.date ? moment(sST.date) : undefined;
      });
    }
    return res;
  }
}
