import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPieceJointe, PieceJointe } from 'app/shared/model/missionService/piece-jointe.model';
import { PieceJointeService } from './piece-jointe.service';
import { PieceJointeComponent } from './piece-jointe.component';
import { PieceJointeDetailComponent } from './piece-jointe-detail.component';
import { PieceJointeUpdateComponent } from './piece-jointe-update.component';

@Injectable({ providedIn: 'root' })
export class PieceJointeResolve implements Resolve<IPieceJointe> {
  constructor(private service: PieceJointeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPieceJointe> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((pieceJointe: HttpResponse<PieceJointe>) => {
          if (pieceJointe.body) {
            return of(pieceJointe.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PieceJointe());
  }
}

export const pieceJointeRoute: Routes = [
  {
    path: '',
    component: PieceJointeComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gpmGatewayApp.missionServicePieceJointe.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PieceJointeDetailComponent,
    resolve: {
      pieceJointe: PieceJointeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.missionServicePieceJointe.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PieceJointeUpdateComponent,
    resolve: {
      pieceJointe: PieceJointeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.missionServicePieceJointe.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PieceJointeUpdateComponent,
    resolve: {
      pieceJointe: PieceJointeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gpmGatewayApp.missionServicePieceJointe.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
