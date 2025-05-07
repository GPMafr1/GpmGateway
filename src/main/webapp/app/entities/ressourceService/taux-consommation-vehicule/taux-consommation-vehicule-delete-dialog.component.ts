import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITauxConsommationVehicule } from 'app/shared/model/ressourceService/taux-consommation-vehicule.model';
import { TauxConsommationVehiculeService } from './taux-consommation-vehicule.service';

@Component({
  templateUrl: './taux-consommation-vehicule-delete-dialog.component.html',
})
export class TauxConsommationVehiculeDeleteDialogComponent {
  tauxConsommationVehicule?: ITauxConsommationVehicule;

  constructor(
    protected tauxConsommationVehiculeService: TauxConsommationVehiculeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tauxConsommationVehiculeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tauxConsommationVehiculeListModification');
      this.activeModal.close();
    });
  }
}
