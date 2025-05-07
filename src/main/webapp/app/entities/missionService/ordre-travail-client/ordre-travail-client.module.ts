import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GpmGatewaySharedModule } from 'app/shared/shared.module';
import { OrdreTravailClientComponent } from './ordre-travail-client.component';
import { OrdreTravailClientDetailComponent } from './ordre-travail-client-detail.component';
import { OrdreTravailClientUpdateComponent } from './ordre-travail-client-update.component';
import { OrdreTravailClientDeleteDialogComponent } from './ordre-travail-client-delete-dialog.component';
import { ordreTravailClientRoute } from './ordre-travail-client.route';

@NgModule({
  imports: [GpmGatewaySharedModule, RouterModule.forChild(ordreTravailClientRoute)],
  declarations: [
    OrdreTravailClientComponent,
    OrdreTravailClientDetailComponent,
    OrdreTravailClientUpdateComponent,
    OrdreTravailClientDeleteDialogComponent,
  ],
  entryComponents: [OrdreTravailClientDeleteDialogComponent],
})
export class MissionServiceOrdreTravailClientModule {}
