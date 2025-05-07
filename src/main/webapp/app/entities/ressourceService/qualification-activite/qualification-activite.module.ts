import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GpmGatewaySharedModule } from 'app/shared/shared.module';
import { QualificationActiviteComponent } from './qualification-activite.component';
import { QualificationActiviteDetailComponent } from './qualification-activite-detail.component';
import { QualificationActiviteUpdateComponent } from './qualification-activite-update.component';
import { QualificationActiviteDeleteDialogComponent } from './qualification-activite-delete-dialog.component';
import { qualificationActiviteRoute } from './qualification-activite.route';

@NgModule({
  imports: [GpmGatewaySharedModule, RouterModule.forChild(qualificationActiviteRoute)],
  declarations: [
    QualificationActiviteComponent,
    QualificationActiviteDetailComponent,
    QualificationActiviteUpdateComponent,
    QualificationActiviteDeleteDialogComponent,
  ],
  entryComponents: [QualificationActiviteDeleteDialogComponent],
})
export class RessourceServiceQualificationActiviteModule {}
