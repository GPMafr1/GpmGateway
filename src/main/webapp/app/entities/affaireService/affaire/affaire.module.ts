import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GpmGatewaySharedModule } from 'app/shared/shared.module';
import { AffaireComponent } from './affaire.component';
import { AffaireDetailComponent } from './affaire-detail.component';
import { AffaireUpdateComponent } from './affaire-update.component';
import { AffaireDeleteDialogComponent } from './affaire-delete-dialog.component';
import { affaireRoute } from './affaire.route';

@NgModule({
  imports: [GpmGatewaySharedModule, RouterModule.forChild(affaireRoute)],
  declarations: [AffaireComponent, AffaireDetailComponent, AffaireUpdateComponent, AffaireDeleteDialogComponent],
  entryComponents: [AffaireDeleteDialogComponent],
})
export class AffaireServiceAffaireModule {}
