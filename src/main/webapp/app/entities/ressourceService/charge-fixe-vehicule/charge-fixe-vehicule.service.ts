import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IChargeFixeVehicule } from 'app/shared/model/ressourceService/charge-fixe-vehicule.model';

type EntityResponseType = HttpResponse<IChargeFixeVehicule>;
type EntityArrayResponseType = HttpResponse<IChargeFixeVehicule[]>;

@Injectable({ providedIn: 'root' })
export class ChargeFixeVehiculeService {
  public resourceUrl = SERVER_API_URL + 'services/ressourceservice/api/charge-fixe-vehicules';

  constructor(protected http: HttpClient) {}

  create(chargeFixeVehicule: IChargeFixeVehicule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chargeFixeVehicule);
    return this.http
      .post<IChargeFixeVehicule>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(chargeFixeVehicule: IChargeFixeVehicule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chargeFixeVehicule);
    return this.http
      .put<IChargeFixeVehicule>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IChargeFixeVehicule>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IChargeFixeVehicule[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(chargeFixeVehicule: IChargeFixeVehicule): IChargeFixeVehicule {
    const copy: IChargeFixeVehicule = Object.assign({}, chargeFixeVehicule, {
      date: chargeFixeVehicule.date && chargeFixeVehicule.date.isValid() ? chargeFixeVehicule.date.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((chargeFixeVehicule: IChargeFixeVehicule) => {
        chargeFixeVehicule.date = chargeFixeVehicule.date ? moment(chargeFixeVehicule.date) : undefined;
      });
    }
    return res;
  }
}
