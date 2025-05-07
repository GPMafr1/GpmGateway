import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQualificationActivite } from 'app/shared/model/ressourceService/qualification-activite.model';
import { QualificationActiviteService } from './qualification-activite.service';

@Component({
  templateUrl: './qualification-activite-delete-dialog.component.html',
})
export class QualificationActiviteDeleteDialogComponent {
  qualificationActivite?: IQualificationActivite;

  constructor(
    protected qualificationActiviteService: QualificationActiviteService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.qualificationActiviteService.delete(id).subscribe(() => {
      this.eventManager.broadcast('qualificationActiviteListModification');
      this.activeModal.close();
    });
  }
}
