import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IWorkOrder } from 'app/shared/model/missionService/work-order.model';

type EntityResponseType = HttpResponse<IWorkOrder>;
type EntityArrayResponseType = HttpResponse<IWorkOrder[]>;

@Injectable({ providedIn: 'root' })
export class WorkOrderService {
  public resourceUrl = SERVER_API_URL + 'services/missionservice/api/work-orders';

  constructor(protected http: HttpClient) {}

  create(workOrder: IWorkOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(workOrder);
    return this.http
      .post<IWorkOrder>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(workOrder: IWorkOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(workOrder);
    return this.http
      .put<IWorkOrder>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IWorkOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IWorkOrder[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(workOrder: IWorkOrder): IWorkOrder {
    const copy: IWorkOrder = Object.assign({}, workOrder, {
      dateHeureDebutPrevisionnel:
        workOrder.dateHeureDebutPrevisionnel && workOrder.dateHeureDebutPrevisionnel.isValid()
          ? workOrder.dateHeureDebutPrevisionnel.toJSON()
          : undefined,
      dateHeureFinPrevisionnel:
        workOrder.dateHeureFinPrevisionnel && workOrder.dateHeureFinPrevisionnel.isValid()
          ? workOrder.dateHeureFinPrevisionnel.toJSON()
          : undefined,
      dateHeureDebutReel:
        workOrder.dateHeureDebutReel && workOrder.dateHeureDebutReel.isValid() ? workOrder.dateHeureDebutReel.toJSON() : undefined,
      dateHeureFinReel:
        workOrder.dateHeureFinReel && workOrder.dateHeureFinReel.isValid() ? workOrder.dateHeureFinReel.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateHeureDebutPrevisionnel = res.body.dateHeureDebutPrevisionnel ? moment(res.body.dateHeureDebutPrevisionnel) : undefined;
      res.body.dateHeureFinPrevisionnel = res.body.dateHeureFinPrevisionnel ? moment(res.body.dateHeureFinPrevisionnel) : undefined;
      res.body.dateHeureDebutReel = res.body.dateHeureDebutReel ? moment(res.body.dateHeureDebutReel) : undefined;
      res.body.dateHeureFinReel = res.body.dateHeureFinReel ? moment(res.body.dateHeureFinReel) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((workOrder: IWorkOrder) => {
        workOrder.dateHeureDebutPrevisionnel = workOrder.dateHeureDebutPrevisionnel
          ? moment(workOrder.dateHeureDebutPrevisionnel)
          : undefined;
        workOrder.dateHeureFinPrevisionnel = workOrder.dateHeureFinPrevisionnel ? moment(workOrder.dateHeureFinPrevisionnel) : undefined;
        workOrder.dateHeureDebutReel = workOrder.dateHeureDebutReel ? moment(workOrder.dateHeureDebutReel) : undefined;
        workOrder.dateHeureFinReel = workOrder.dateHeureFinReel ? moment(workOrder.dateHeureFinReel) : undefined;
      });
    }
    return res;
  }
}
