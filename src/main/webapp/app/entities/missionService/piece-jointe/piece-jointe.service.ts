import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPieceJointe } from 'app/shared/model/missionService/piece-jointe.model';

type EntityResponseType = HttpResponse<IPieceJointe>;
type EntityArrayResponseType = HttpResponse<IPieceJointe[]>;

@Injectable({ providedIn: 'root' })
export class PieceJointeService {
  public resourceUrl = SERVER_API_URL + 'services/missionservice/api/piece-jointes';

  constructor(protected http: HttpClient) {}

  create(pieceJointe: IPieceJointe): Observable<EntityResponseType> {
    return this.http.post<IPieceJointe>(this.resourceUrl, pieceJointe, { observe: 'response' });
  }

  update(pieceJointe: IPieceJointe): Observable<EntityResponseType> {
    return this.http.put<IPieceJointe>(this.resourceUrl, pieceJointe, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPieceJointe>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPieceJointe[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
