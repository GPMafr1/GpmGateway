import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GpmGatewaySharedModule } from 'app/shared/shared.module';
import { OrdreFacturationComponent } from './ordre-facturation.component';
import { OrdreFacturationDetailComponent } from './ordre-facturation-detail.component';
import { OrdreFacturationUpdateComponent } from './ordre-facturation-update.component';
import { OrdreFacturationDeleteDialogComponent } from './ordre-facturation-delete-dialog.component';
import { ordreFacturationRoute } from './ordre-facturation.route';

@NgModule({
  imports: [GpmGatewaySharedModule, RouterModule.forChild(ordreFacturationRoute)],
  declarations: [
    OrdreFacturationComponent,
    OrdreFacturationDetailComponent,
    OrdreFacturationUpdateComponent,
    OrdreFacturationDeleteDialogComponent,
  ],
  entryComponents: [OrdreFacturationDeleteDialogComponent],
})
export class FacturationServiceOrdreFacturationModule {}
