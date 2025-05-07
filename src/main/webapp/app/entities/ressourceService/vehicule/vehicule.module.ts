import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GpmGatewaySharedModule } from 'app/shared/shared.module';
import { VehiculeComponent } from './vehicule.component';
import { VehiculeDetailComponent } from './vehicule-detail.component';
import { VehiculeUpdateComponent } from './vehicule-update.component';
import { VehiculeDeleteDialogComponent } from './vehicule-delete-dialog.component';
import { vehiculeRoute } from './vehicule.route';

@NgModule({
  imports: [GpmGatewaySharedModule, RouterModule.forChild(vehiculeRoute)],
  declarations: [VehiculeComponent, VehiculeDetailComponent, VehiculeUpdateComponent, VehiculeDeleteDialogComponent],
  entryComponents: [VehiculeDeleteDialogComponent],
})
export class RessourceServiceVehiculeModule {}
