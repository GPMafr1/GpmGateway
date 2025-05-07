import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GpmGatewaySharedModule } from 'app/shared/shared.module';
import { SiteMissionComponent } from './site-mission.component';
import { SiteMissionDetailComponent } from './site-mission-detail.component';
import { SiteMissionUpdateComponent } from './site-mission-update.component';
import { SiteMissionDeleteDialogComponent } from './site-mission-delete-dialog.component';
import { siteMissionRoute } from './site-mission.route';

@NgModule({
  imports: [GpmGatewaySharedModule, RouterModule.forChild(siteMissionRoute)],
  declarations: [SiteMissionComponent, SiteMissionDetailComponent, SiteMissionUpdateComponent, SiteMissionDeleteDialogComponent],
  entryComponents: [SiteMissionDeleteDialogComponent],
})
export class MissionServiceSiteMissionModule {}
