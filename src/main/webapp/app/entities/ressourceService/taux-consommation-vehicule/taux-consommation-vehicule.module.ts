import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GpmGatewaySharedModule } from 'app/shared/shared.module';
import { TauxConsommationVehiculeComponent } from './taux-consommation-vehicule.component';
import { TauxConsommationVehiculeDetailComponent } from './taux-consommation-vehicule-detail.component';
import { TauxConsommationVehiculeUpdateComponent } from './taux-consommation-vehicule-update.component';
import { TauxConsommationVehiculeDeleteDialogComponent } from './taux-consommation-vehicule-delete-dialog.component';
import { tauxConsommationVehiculeRoute } from './taux-consommation-vehicule.route';

@NgModule({
  imports: [GpmGatewaySharedModule, RouterModule.forChild(tauxConsommationVehiculeRoute)],
  declarations: [
    TauxConsommationVehiculeComponent,
    TauxConsommationVehiculeDetailComponent,
    TauxConsommationVehiculeUpdateComponent,
    TauxConsommationVehiculeDeleteDialogComponent,
  ],
  entryComponents: [TauxConsommationVehiculeDeleteDialogComponent],
})
export class RessourceServiceTauxConsommationVehiculeModule {}
