import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOrdreTravailClient, OrdreTravailClient } from 'app/shared/model/missionService/ordre-travail-client.model';
import { OrdreTravailClientService } from './ordre-travail-client.service';
import { OrdreTravailClientComponent } from './ordre-travail-client.component';
import { OrdreTravailClientDetailComponent } from './ordre-travail-client-detail.component';
import { OrdreTravailClientUpdateComponent } from './ordre-travail-client-update.component';

@Injectable({ providedIn: 'root' })
export class OrdreTravailClientResolve implements Resolve<IOrdreTravailClient> {
  constructor(private service: OrdreTravailClientService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOrdreTravailClient> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ordreTravailClient: HttpResponse<OrdreTravailClient>) => {
          if (ordreTravailClient.body) {
            return of(ordreTravailClient.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OrdreTravailClient());
  }
}

export const ordreTravailClientRoute: Routes = [
  {
    path: '',
    component: OrdreTravailClientComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gpmGatewayApp.missionServiceOrdreTravailClient.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OrdreTravailClientDetailComponent,
    resolve: {
      ordreTravailClient: OrdreTravailClientResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.missionServiceOrdreTravailClient.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OrdreTravailClientUpdateComponent,
    resolve: {
      ordreTravailClient: OrdreTravailClientResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.missionServiceOrdreTravailClient.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OrdreTravailClientUpdateComponent,
    resolve: {
      ordreTravailClient: OrdreTravailClientResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.missionServiceOrdreTravailClient.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
