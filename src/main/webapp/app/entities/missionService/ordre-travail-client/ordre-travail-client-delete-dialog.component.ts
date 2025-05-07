import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrdreTravailClient } from 'app/shared/model/missionService/ordre-travail-client.model';
import { OrdreTravailClientService } from './ordre-travail-client.service';

@Component({
  templateUrl: './ordre-travail-client-delete-dialog.component.html',
})
export class OrdreTravailClientDeleteDialogComponent {
  ordreTravailClient?: IOrdreTravailClient;

  constructor(
    protected ordreTravailClientService: OrdreTravailClientService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ordreTravailClientService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ordreTravailClientListModification');
      this.activeModal.close();
    });
  }
}
