import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IWorkOrder, WorkOrder } from 'app/shared/model/missionService/work-order.model';
import { WorkOrderService } from './work-order.service';
import { WorkOrderComponent } from './work-order.component';
import { WorkOrderDetailComponent } from './work-order-detail.component';
import { WorkOrderUpdateComponent } from './work-order-update.component';

@Injectable({ providedIn: 'root' })
export class WorkOrderResolve implements Resolve<IWorkOrder> {
  constructor(private service: WorkOrderService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWorkOrder> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((workOrder: HttpResponse<WorkOrder>) => {
          if (workOrder.body) {
            return of(workOrder.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new WorkOrder());
  }
}

export const workOrderRoute: Routes = [
  {
    path: '',
    component: WorkOrderComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gpmGatewayApp.missionServiceWorkOrder.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WorkOrderDetailComponent,
    resolve: {
      workOrder: WorkOrderResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.missionServiceWorkOrder.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WorkOrderUpdateComponent,
    resolve: {
      workOrder: WorkOrderResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.missionServiceWorkOrder.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WorkOrderUpdateComponent,
    resolve: {
      workOrder: WorkOrderResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.missionServiceWorkOrder.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
