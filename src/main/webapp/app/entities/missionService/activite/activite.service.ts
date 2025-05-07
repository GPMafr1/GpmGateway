import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IActivite } from 'app/shared/model/missionService/activite.model';

type EntityResponseType = HttpResponse<IActivite>;
type EntityArrayResponseType = HttpResponse<IActivite[]>;

@Injectable({ providedIn: 'root' })
export class ActiviteService {
  public resourceUrl = SERVER_API_URL + 'services/missionservice/api/activites';

  constructor(protected http: HttpClient) {}

  create(activite: IActivite): Observable<EntityResponseType> {
    return this.http.post<IActivite>(this.resourceUrl, activite, { observe: 'response' });
  }

  update(activite: IActivite): Observable<EntityResponseType> {
    return this.http.put<IActivite>(this.resourceUrl, activite, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IActivite>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IActivite[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
