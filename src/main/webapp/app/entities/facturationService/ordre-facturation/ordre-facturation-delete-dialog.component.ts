import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrdreFacturation } from 'app/shared/model/facturationService/ordre-facturation.model';
import { OrdreFacturationService } from './ordre-facturation.service';

@Component({
  templateUrl: './ordre-facturation-delete-dialog.component.html',
})
export class OrdreFacturationDeleteDialogComponent {
  ordreFacturation?: IOrdreFacturation;

  constructor(
    protected ordreFacturationService: OrdreFacturationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ordreFacturationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ordreFacturationListModification');
      this.activeModal.close();
    });
  }
}
