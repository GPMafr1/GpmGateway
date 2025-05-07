import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IQualificationActivite } from 'app/shared/model/ressourceService/qualification-activite.model';

type EntityResponseType = HttpResponse<IQualificationActivite>;
type EntityArrayResponseType = HttpResponse<IQualificationActivite[]>;

@Injectable({ providedIn: 'root' })
export class QualificationActiviteService {
  public resourceUrl = SERVER_API_URL + 'services/ressourceservice/api/qualification-activites';

  constructor(protected http: HttpClient) {}

  create(qualificationActivite: IQualificationActivite): Observable<EntityResponseType> {
    return this.http.post<IQualificationActivite>(this.resourceUrl, qualificationActivite, { observe: 'response' });
  }

  update(qualificationActivite: IQualificationActivite): Observable<EntityResponseType> {
    return this.http.put<IQualificationActivite>(this.resourceUrl, qualificationActivite, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IQualificationActivite>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQualificationActivite[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
