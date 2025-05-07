import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISST } from 'app/shared/model/missionService/sst.model';
import { SSTService } from './sst.service';

@Component({
  templateUrl: './sst-delete-dialog.component.html',
})
export class SSTDeleteDialogComponent {
  sST?: ISST;

  constructor(protected sSTService: SSTService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sSTService.delete(id).subscribe(() => {
      this.eventManager.broadcast('sSTListModification');
      this.activeModal.close();
    });
  }
}
