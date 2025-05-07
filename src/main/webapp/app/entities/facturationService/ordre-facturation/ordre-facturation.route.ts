import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOrdreFacturation, OrdreFacturation } from 'app/shared/model/facturationService/ordre-facturation.model';
import { OrdreFacturationService } from './ordre-facturation.service';
import { OrdreFacturationComponent } from './ordre-facturation.component';
import { OrdreFacturationDetailComponent } from './ordre-facturation-detail.component';
import { OrdreFacturationUpdateComponent } from './ordre-facturation-update.component';

@Injectable({ providedIn: 'root' })
export class OrdreFacturationResolve implements Resolve<IOrdreFacturation> {
  constructor(private service: OrdreFacturationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOrdreFacturation> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ordreFacturation: HttpResponse<OrdreFacturation>) => {
          if (ordreFacturation.body) {
            return of(ordreFacturation.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OrdreFacturation());
  }
}

export const ordreFacturationRoute: Routes = [
  {
    path: '',
    component: OrdreFacturationComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gpmGatewayApp.facturationServiceOrdreFacturation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OrdreFacturationDetailComponent,
    resolve: {
      ordreFacturation: OrdreFacturationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.facturationServiceOrdreFacturation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OrdreFacturationUpdateComponent,
    resolve: {
      ordreFacturation: OrdreFacturationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.facturationServiceOrdreFacturation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OrdreFacturationUpdateComponent,
    resolve: {
      ordreFacturation: OrdreFacturationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.facturationServiceOrdreFacturation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
