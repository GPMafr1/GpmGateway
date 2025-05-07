import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITauxConsommationVehicule, TauxConsommationVehicule } from 'app/shared/model/ressourceService/taux-consommation-vehicule.model';
import { TauxConsommationVehiculeService } from './taux-consommation-vehicule.service';
import { TauxConsommationVehiculeComponent } from './taux-consommation-vehicule.component';
import { TauxConsommationVehiculeDetailComponent } from './taux-consommation-vehicule-detail.component';
import { TauxConsommationVehiculeUpdateComponent } from './taux-consommation-vehicule-update.component';

@Injectable({ providedIn: 'root' })
export class TauxConsommationVehiculeResolve implements Resolve<ITauxConsommationVehicule> {
  constructor(private service: TauxConsommationVehiculeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITauxConsommationVehicule> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tauxConsommationVehicule: HttpResponse<TauxConsommationVehicule>) => {
          if (tauxConsommationVehicule.body) {
            return of(tauxConsommationVehicule.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TauxConsommationVehicule());
  }
}

export const tauxConsommationVehiculeRoute: Routes = [
  {
    path: '',
    component: TauxConsommationVehiculeComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gpmGatewayApp.ressourceServiceTauxConsommationVehicule.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TauxConsommationVehiculeDetailComponent,
    resolve: {
      tauxConsommationVehicule: TauxConsommationVehiculeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.ressourceServiceTauxConsommationVehicule.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TauxConsommationVehiculeUpdateComponent,
    resolve: {
      tauxConsommationVehicule: TauxConsommationVehiculeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.ressourceServiceTauxConsommationVehicule.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TauxConsommationVehiculeUpdateComponent,
    resolve: {
      tauxConsommationVehicule: TauxConsommationVehiculeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.ressourceServiceTauxConsommationVehicule.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
