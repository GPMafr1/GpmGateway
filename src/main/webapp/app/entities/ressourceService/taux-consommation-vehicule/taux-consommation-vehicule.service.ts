import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITauxConsommationVehicule } from 'app/shared/model/ressourceService/taux-consommation-vehicule.model';

type EntityResponseType = HttpResponse<ITauxConsommationVehicule>;
type EntityArrayResponseType = HttpResponse<ITauxConsommationVehicule[]>;

@Injectable({ providedIn: 'root' })
export class TauxConsommationVehiculeService {
  public resourceUrl = SERVER_API_URL + 'services/ressourceservice/api/taux-consommation-vehicules';

  constructor(protected http: HttpClient) {}

  create(tauxConsommationVehicule: ITauxConsommationVehicule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tauxConsommationVehicule);
    return this.http
      .post<ITauxConsommationVehicule>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(tauxConsommationVehicule: ITauxConsommationVehicule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tauxConsommationVehicule);
    return this.http
      .put<ITauxConsommationVehicule>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITauxConsommationVehicule>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITauxConsommationVehicule[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(tauxConsommationVehicule: ITauxConsommationVehicule): ITauxConsommationVehicule {
    const copy: ITauxConsommationVehicule = Object.assign({}, tauxConsommationVehicule, {
      date:
        tauxConsommationVehicule.date && tauxConsommationVehicule.date.isValid()
          ? tauxConsommationVehicule.date.format(DATE_FORMAT)
          : undefined,
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
      res.body.forEach((tauxConsommationVehicule: ITauxConsommationVehicule) => {
        tauxConsommationVehicule.date = tauxConsommationVehicule.date ? moment(tauxConsommationVehicule.date) : undefined;
      });
    }
    return res;
  }
}
