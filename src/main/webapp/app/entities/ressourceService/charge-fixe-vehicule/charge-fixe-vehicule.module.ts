import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GpmGatewaySharedModule } from 'app/shared/shared.module';
import { ChargeFixeVehiculeComponent } from './charge-fixe-vehicule.component';
import { ChargeFixeVehiculeDetailComponent } from './charge-fixe-vehicule-detail.component';
import { ChargeFixeVehiculeUpdateComponent } from './charge-fixe-vehicule-update.component';
import { ChargeFixeVehiculeDeleteDialogComponent } from './charge-fixe-vehicule-delete-dialog.component';
import { chargeFixeVehiculeRoute } from './charge-fixe-vehicule.route';

@NgModule({
  imports: [GpmGatewaySharedModule, RouterModule.forChild(chargeFixeVehiculeRoute)],
  declarations: [
    ChargeFixeVehiculeComponent,
    ChargeFixeVehiculeDetailComponent,
    ChargeFixeVehiculeUpdateComponent,
    ChargeFixeVehiculeDeleteDialogComponent,
  ],
  entryComponents: [ChargeFixeVehiculeDeleteDialogComponent],
})
export class RessourceServiceChargeFixeVehiculeModule {}
