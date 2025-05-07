import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IVehicule } from 'app/shared/model/ressourceService/vehicule.model';

type EntityResponseType = HttpResponse<IVehicule>;
type EntityArrayResponseType = HttpResponse<IVehicule[]>;

@Injectable({ providedIn: 'root' })
export class VehiculeService {
  public resourceUrl = SERVER_API_URL + 'services/ressourceservice/api/vehicules';

  constructor(protected http: HttpClient) {}

  create(vehicule: IVehicule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vehicule);
    return this.http
      .post<IVehicule>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(vehicule: IVehicule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vehicule);
    return this.http
      .put<IVehicule>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVehicule>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVehicule[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(vehicule: IVehicule): IVehicule {
    const copy: IVehicule = Object.assign({}, vehicule, {
      dateCirculation:
        vehicule.dateCirculation && vehicule.dateCirculation.isValid() ? vehicule.dateCirculation.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateCirculation = res.body.dateCirculation ? moment(res.body.dateCirculation) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((vehicule: IVehicule) => {
        vehicule.dateCirculation = vehicule.dateCirculation ? moment(vehicule.dateCirculation) : undefined;
      });
    }
    return res;
  }
}
