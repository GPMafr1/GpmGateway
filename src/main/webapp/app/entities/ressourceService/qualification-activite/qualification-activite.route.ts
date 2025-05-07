import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IQualificationActivite, QualificationActivite } from 'app/shared/model/ressourceService/qualification-activite.model';
import { QualificationActiviteService } from './qualification-activite.service';
import { QualificationActiviteComponent } from './qualification-activite.component';
import { QualificationActiviteDetailComponent } from './qualification-activite-detail.component';
import { QualificationActiviteUpdateComponent } from './qualification-activite-update.component';

@Injectable({ providedIn: 'root' })
export class QualificationActiviteResolve implements Resolve<IQualificationActivite> {
  constructor(private service: QualificationActiviteService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IQualificationActivite> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((qualificationActivite: HttpResponse<QualificationActivite>) => {
          if (qualificationActivite.body) {
            return of(qualificationActivite.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new QualificationActivite());
  }
}

export const qualificationActiviteRoute: Routes = [
  {
    path: '',
    component: QualificationActiviteComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gpmGatewayApp.ressourceServiceQualificationActivite.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: QualificationActiviteDetailComponent,
    resolve: {
      qualificationActivite: QualificationActiviteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.ressourceServiceQualificationActivite.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: QualificationActiviteUpdateComponent,
    resolve: {
      qualificationActivite: QualificationActiviteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.ressourceServiceQualificationActivite.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: QualificationActiviteUpdateComponent,
    resolve: {
      qualificationActivite: QualificationActiviteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.ressourceServiceQualificationActivite.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
