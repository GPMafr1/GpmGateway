import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GpmGatewaySharedModule } from 'app/shared/shared.module';
import { WorkOrderComponent } from './work-order.component';
import { WorkOrderDetailComponent } from './work-order-detail.component';
import { WorkOrderUpdateComponent } from './work-order-update.component';
import { WorkOrderDeleteDialogComponent } from './work-order-delete-dialog.component';
import { workOrderRoute } from './work-order.route';

@NgModule({
  imports: [GpmGatewaySharedModule, RouterModule.forChild(workOrderRoute)],
  declarations: [WorkOrderComponent, WorkOrderDetailComponent, WorkOrderUpdateComponent, WorkOrderDeleteDialogComponent],
  entryComponents: [WorkOrderDeleteDialogComponent],
})
export class MissionServiceWorkOrderModule {}
