import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOrdreTravailClient } from 'app/shared/model/missionService/ordre-travail-client.model';

type EntityResponseType = HttpResponse<IOrdreTravailClient>;
type EntityArrayResponseType = HttpResponse<IOrdreTravailClient[]>;

@Injectable({ providedIn: 'root' })
export class OrdreTravailClientService {
  public resourceUrl = SERVER_API_URL + 'services/missionservice/api/ordre-travail-clients';

  constructor(protected http: HttpClient) {}

  create(ordreTravailClient: IOrdreTravailClient): Observable<EntityResponseType> {
    return this.http.post<IOrdreTravailClient>(this.resourceUrl, ordreTravailClient, { observe: 'response' });
  }

  update(ordreTravailClient: IOrdreTravailClient): Observable<EntityResponseType> {
    return this.http.put<IOrdreTravailClient>(this.resourceUrl, ordreTravailClient, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOrdreTravailClient>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOrdreTravailClient[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
