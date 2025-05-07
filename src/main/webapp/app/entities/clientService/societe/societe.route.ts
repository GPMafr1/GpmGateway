import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISociete, Societe } from 'app/shared/model/clientService/societe.model';
import { SocieteService } from './societe.service';
import { SocieteComponent } from './societe.component';
import { SocieteDetailComponent } from './societe-detail.component';
import { SocieteUpdateComponent } from './societe-update.component';

@Injectable({ providedIn: 'root' })
export class SocieteResolve implements Resolve<ISociete> {
  constructor(private service: SocieteService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISociete> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((societe: HttpResponse<Societe>) => {
          if (societe.body) {
            return of(societe.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Societe());
  }
}

export const societeRoute: Routes = [
  {
    path: '',
    component: SocieteComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gpmGatewayApp.clientServiceSociete.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SocieteDetailComponent,
    resolve: {
      societe: SocieteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.clientServiceSociete.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SocieteUpdateComponent,
    resolve: {
      societe: SocieteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.clientServiceSociete.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SocieteUpdateComponent,
    resolve: {
      societe: SocieteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.clientServiceSociete.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
