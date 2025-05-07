import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISiteMission, SiteMission } from 'app/shared/model/missionService/site-mission.model';
import { SiteMissionService } from './site-mission.service';
import { SiteMissionComponent } from './site-mission.component';
import { SiteMissionDetailComponent } from './site-mission-detail.component';
import { SiteMissionUpdateComponent } from './site-mission-update.component';

@Injectable({ providedIn: 'root' })
export class SiteMissionResolve implements Resolve<ISiteMission> {
  constructor(private service: SiteMissionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISiteMission> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((siteMission: HttpResponse<SiteMission>) => {
          if (siteMission.body) {
            return of(siteMission.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SiteMission());
  }
}

export const siteMissionRoute: Routes = [
  {
    path: '',
    component: SiteMissionComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gpmGatewayApp.missionServiceSiteMission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SiteMissionDetailComponent,
    resolve: {
      siteMission: SiteMissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.missionServiceSiteMission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SiteMissionUpdateComponent,
    resolve: {
      siteMission: SiteMissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.missionServiceSiteMission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SiteMissionUpdateComponent,
    resolve: {
      siteMission: SiteMissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.missionServiceSiteMission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
