import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GpmGatewaySharedModule } from 'app/shared/shared.module';
import { FraisMissionComponent } from './frais-mission.component';
import { FraisMissionDetailComponent } from './frais-mission-detail.component';
import { FraisMissionUpdateComponent } from './frais-mission-update.component';
import { FraisMissionDeleteDialogComponent } from './frais-mission-delete-dialog.component';
import { fraisMissionRoute } from './frais-mission.route';

@NgModule({
  imports: [GpmGatewaySharedModule, RouterModule.forChild(fraisMissionRoute)],
  declarations: [FraisMissionComponent, FraisMissionDetailComponent, FraisMissionUpdateComponent, FraisMissionDeleteDialogComponent],
  entryComponents: [FraisMissionDeleteDialogComponent],
})
export class FacturationServiceFraisMissionModule {}
