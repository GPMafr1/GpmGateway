import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISociete } from 'app/shared/model/clientService/societe.model';
import { SocieteService } from './societe.service';

@Component({
  templateUrl: './societe-delete-dialog.component.html',
})
export class SocieteDeleteDialogComponent {
  societe?: ISociete;

  constructor(protected societeService: SocieteService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.societeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('societeListModification');
      this.activeModal.close();
    });
  }
}
