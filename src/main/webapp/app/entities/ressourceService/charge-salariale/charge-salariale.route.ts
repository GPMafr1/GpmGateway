import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IChargeSalariale, ChargeSalariale } from 'app/shared/model/ressourceService/charge-salariale.model';
import { ChargeSalarialeService } from './charge-salariale.service';
import { ChargeSalarialeComponent } from './charge-salariale.component';
import { ChargeSalarialeDetailComponent } from './charge-salariale-detail.component';
import { ChargeSalarialeUpdateComponent } from './charge-salariale-update.component';

@Injectable({ providedIn: 'root' })
export class ChargeSalarialeResolve implements Resolve<IChargeSalariale> {
  constructor(private service: ChargeSalarialeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChargeSalariale> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((chargeSalariale: HttpResponse<ChargeSalariale>) => {
          if (chargeSalariale.body) {
            return of(chargeSalariale.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ChargeSalariale());
  }
}

export const chargeSalarialeRoute: Routes = [
  {
    path: '',
    component: ChargeSalarialeComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gpmGatewayApp.ressourceServiceChargeSalariale.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ChargeSalarialeDetailComponent,
    resolve: {
      chargeSalariale: ChargeSalarialeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.ressourceServiceChargeSalariale.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ChargeSalarialeUpdateComponent,
    resolve: {
      chargeSalariale: ChargeSalarialeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.ressourceServiceChargeSalariale.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ChargeSalarialeUpdateComponent,
    resolve: {
      chargeSalariale: ChargeSalarialeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.ressourceServiceChargeSalariale.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
