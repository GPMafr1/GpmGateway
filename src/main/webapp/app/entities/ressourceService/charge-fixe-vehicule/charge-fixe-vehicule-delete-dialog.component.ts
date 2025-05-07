import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChargeFixeVehicule } from 'app/shared/model/ressourceService/charge-fixe-vehicule.model';
import { ChargeFixeVehiculeService } from './charge-fixe-vehicule.service';

@Component({
  templateUrl: './charge-fixe-vehicule-delete-dialog.component.html',
})
export class ChargeFixeVehiculeDeleteDialogComponent {
  chargeFixeVehicule?: IChargeFixeVehicule;

  constructor(
    protected chargeFixeVehiculeService: ChargeFixeVehiculeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.chargeFixeVehiculeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('chargeFixeVehiculeListModification');
      this.activeModal.close();
    });
  }
}
