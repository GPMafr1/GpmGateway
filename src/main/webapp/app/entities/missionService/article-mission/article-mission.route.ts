import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IArticleMission, ArticleMission } from 'app/shared/model/missionService/article-mission.model';
import { ArticleMissionService } from './article-mission.service';
import { ArticleMissionComponent } from './article-mission.component';
import { ArticleMissionDetailComponent } from './article-mission-detail.component';
import { ArticleMissionUpdateComponent } from './article-mission-update.component';

@Injectable({ providedIn: 'root' })
export class ArticleMissionResolve implements Resolve<IArticleMission> {
  constructor(private service: ArticleMissionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IArticleMission> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((articleMission: HttpResponse<ArticleMission>) => {
          if (articleMission.body) {
            return of(articleMission.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ArticleMission());
  }
}

export const articleMissionRoute: Routes = [
  {
    path: '',
    component: ArticleMissionComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gpmGatewayApp.missionServiceArticleMission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ArticleMissionDetailComponent,
    resolve: {
      articleMission: ArticleMissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.missionServiceArticleMission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ArticleMissionUpdateComponent,
    resolve: {
      articleMission: ArticleMissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.missionServiceArticleMission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ArticleMissionUpdateComponent,
    resolve: {
      articleMission: ArticleMissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.missionServiceArticleMission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
