import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GpmGatewaySharedModule } from 'app/shared/shared.module';
import { PieceJointeComponent } from './piece-jointe.component';
import { PieceJointeDetailComponent } from './piece-jointe-detail.component';
import { PieceJointeUpdateComponent } from './piece-jointe-update.component';
import { PieceJointeDeleteDialogComponent } from './piece-jointe-delete-dialog.component';
import { pieceJointeRoute } from './piece-jointe.route';

@NgModule({
  imports: [GpmGatewaySharedModule, RouterModule.forChild(pieceJointeRoute)],
  declarations: [PieceJointeComponent, PieceJointeDetailComponent, PieceJointeUpdateComponent, PieceJointeDeleteDialogComponent],
  entryComponents: [PieceJointeDeleteDialogComponent],
})
export class MissionServicePieceJointeModule {}
