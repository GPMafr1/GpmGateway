import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IArticleMission } from 'app/shared/model/missionService/article-mission.model';

type EntityResponseType = HttpResponse<IArticleMission>;
type EntityArrayResponseType = HttpResponse<IArticleMission[]>;

@Injectable({ providedIn: 'root' })
export class ArticleMissionService {
  public resourceUrl = SERVER_API_URL + 'services/missionservice/api/article-missions';

  constructor(protected http: HttpClient) {}

  create(articleMission: IArticleMission): Observable<EntityResponseType> {
    return this.http.post<IArticleMission>(this.resourceUrl, articleMission, { observe: 'response' });
  }

  update(articleMission: IArticleMission): Observable<EntityResponseType> {
    return this.http.put<IArticleMission>(this.resourceUrl, articleMission, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IArticleMission>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IArticleMission[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
