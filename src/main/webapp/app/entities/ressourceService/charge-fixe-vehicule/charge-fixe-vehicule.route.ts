import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IChargeFixeVehicule, ChargeFixeVehicule } from 'app/shared/model/ressourceService/charge-fixe-vehicule.model';
import { ChargeFixeVehiculeService } from './charge-fixe-vehicule.service';
import { ChargeFixeVehiculeComponent } from './charge-fixe-vehicule.component';
import { ChargeFixeVehiculeDetailComponent } from './charge-fixe-vehicule-detail.component';
import { ChargeFixeVehiculeUpdateComponent } from './charge-fixe-vehicule-update.component';

@Injectable({ providedIn: 'root' })
export class ChargeFixeVehiculeResolve implements Resolve<IChargeFixeVehicule> {
  constructor(private service: ChargeFixeVehiculeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChargeFixeVehicule> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((chargeFixeVehicule: HttpResponse<ChargeFixeVehicule>) => {
          if (chargeFixeVehicule.body) {
            return of(chargeFixeVehicule.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ChargeFixeVehicule());
  }
}

export const chargeFixeVehiculeRoute: Routes = [
  {
    path: '',
    component: ChargeFixeVehiculeComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gpmGatewayApp.ressourceServiceChargeFixeVehicule.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ChargeFixeVehiculeDetailComponent,
    resolve: {
      chargeFixeVehicule: ChargeFixeVehiculeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.ressourceServiceChargeFixeVehicule.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ChargeFixeVehiculeUpdateComponent,
    resolve: {
      chargeFixeVehicule: ChargeFixeVehiculeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.ressourceServiceChargeFixeVehicule.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ChargeFixeVehiculeUpdateComponent,
    resolve: {
      chargeFixeVehicule: ChargeFixeVehiculeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.ressourceServiceChargeFixeVehicule.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
