import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChargeSalariale } from 'app/shared/model/ressourceService/charge-salariale.model';
import { ChargeSalarialeService } from './charge-salariale.service';

@Component({
  templateUrl: './charge-salariale-delete-dialog.component.html',
})
export class ChargeSalarialeDeleteDialogComponent {
  chargeSalariale?: IChargeSalariale;

  constructor(
    protected chargeSalarialeService: ChargeSalarialeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.chargeSalarialeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('chargeSalarialeListModification');
      this.activeModal.close();
    });
  }
}
