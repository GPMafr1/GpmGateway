import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAffaire } from 'app/shared/model/affaireService/affaire.model';

type EntityResponseType = HttpResponse<IAffaire>;
type EntityArrayResponseType = HttpResponse<IAffaire[]>;

@Injectable({ providedIn: 'root' })
export class AffaireService {
  public resourceUrl = SERVER_API_URL + 'services/affaireservice/api/affaires';

  constructor(protected http: HttpClient) {}

  create(affaire: IAffaire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(affaire);
    return this.http
      .post<IAffaire>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(affaire: IAffaire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(affaire);
    return this.http
      .put<IAffaire>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAffaire>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAffaire[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(affaire: IAffaire): IAffaire {
    const copy: IAffaire = Object.assign({}, affaire, {
      dateDebut: affaire.dateDebut && affaire.dateDebut.isValid() ? affaire.dateDebut.format(DATE_FORMAT) : undefined,
      dateCloture: affaire.dateCloture && affaire.dateCloture.isValid() ? affaire.dateCloture.format(DATE_FORMAT) : undefined,
      datePassageExecution:
        affaire.datePassageExecution && affaire.datePassageExecution.isValid()
          ? affaire.datePassageExecution.format(DATE_FORMAT)
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateDebut = res.body.dateDebut ? moment(res.body.dateDebut) : undefined;
      res.body.dateCloture = res.body.dateCloture ? moment(res.body.dateCloture) : undefined;
      res.body.datePassageExecution = res.body.datePassageExecution ? moment(res.body.datePassageExecution) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((affaire: IAffaire) => {
        affaire.dateDebut = affaire.dateDebut ? moment(affaire.dateDebut) : undefined;
        affaire.dateCloture = affaire.dateCloture ? moment(affaire.dateCloture) : undefined;
        affaire.datePassageExecution = affaire.datePassageExecution ? moment(affaire.datePassageExecution) : undefined;
      });
    }
    return res;
  }
}
