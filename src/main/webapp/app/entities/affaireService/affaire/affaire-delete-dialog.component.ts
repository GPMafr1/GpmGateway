import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAffaire } from 'app/shared/model/affaireService/affaire.model';
import { AffaireService } from './affaire.service';

@Component({
  templateUrl: './affaire-delete-dialog.component.html',
})
export class AffaireDeleteDialogComponent {
  affaire?: IAffaire;

  constructor(protected affaireService: AffaireService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.affaireService.delete(id).subscribe(() => {
      this.eventManager.broadcast('affaireListModification');
      this.activeModal.close();
    });
  }
}
