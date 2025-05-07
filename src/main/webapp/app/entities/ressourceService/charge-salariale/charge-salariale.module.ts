import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GpmGatewaySharedModule } from 'app/shared/shared.module';
import { ChargeSalarialeComponent } from './charge-salariale.component';
import { ChargeSalarialeDetailComponent } from './charge-salariale-detail.component';
import { ChargeSalarialeUpdateComponent } from './charge-salariale-update.component';
import { ChargeSalarialeDeleteDialogComponent } from './charge-salariale-delete-dialog.component';
import { chargeSalarialeRoute } from './charge-salariale.route';

@NgModule({
  imports: [GpmGatewaySharedModule, RouterModule.forChild(chargeSalarialeRoute)],
  declarations: [
    ChargeSalarialeComponent,
    ChargeSalarialeDetailComponent,
    ChargeSalarialeUpdateComponent,
    ChargeSalarialeDeleteDialogComponent,
  ],
  entryComponents: [ChargeSalarialeDeleteDialogComponent],
})
export class RessourceServiceChargeSalarialeModule {}
