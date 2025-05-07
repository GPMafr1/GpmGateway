import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GpmGatewaySharedModule } from 'app/shared/shared.module';
import { ArticleMissionComponent } from './article-mission.component';
import { ArticleMissionDetailComponent } from './article-mission-detail.component';
import { ArticleMissionUpdateComponent } from './article-mission-update.component';
import { ArticleMissionDeleteDialogComponent } from './article-mission-delete-dialog.component';
import { articleMissionRoute } from './article-mission.route';

@NgModule({
  imports: [GpmGatewaySharedModule, RouterModule.forChild(articleMissionRoute)],
  declarations: [
    ArticleMissionComponent,
    ArticleMissionDetailComponent,
    ArticleMissionUpdateComponent,
    ArticleMissionDeleteDialogComponent,
  ],
  entryComponents: [ArticleMissionDeleteDialogComponent],
})
export class MissionServiceArticleMissionModule {}
