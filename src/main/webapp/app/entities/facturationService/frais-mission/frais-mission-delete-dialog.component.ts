import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFraisMission } from 'app/shared/model/facturationService/frais-mission.model';
import { FraisMissionService } from './frais-mission.service';

@Component({
  templateUrl: './frais-mission-delete-dialog.component.html',
})
export class FraisMissionDeleteDialogComponent {
  fraisMission?: IFraisMission;

  constructor(
    protected fraisMissionService: FraisMissionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fraisMissionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('fraisMissionListModification');
      this.activeModal.close();
    });
  }
}
