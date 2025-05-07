import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GpmGatewaySharedModule } from 'app/shared/shared.module';
import { SSTComponent } from './sst.component';
import { SSTDetailComponent } from './sst-detail.component';
import { SSTUpdateComponent } from './sst-update.component';
import { SSTDeleteDialogComponent } from './sst-delete-dialog.component';
import { sSTRoute } from './sst.route';

@NgModule({
  imports: [GpmGatewaySharedModule, RouterModule.forChild(sSTRoute)],
  declarations: [SSTComponent, SSTDetailComponent, SSTUpdateComponent, SSTDeleteDialogComponent],
  entryComponents: [SSTDeleteDialogComponent],
})
export class MissionServiceSSTModule {}
