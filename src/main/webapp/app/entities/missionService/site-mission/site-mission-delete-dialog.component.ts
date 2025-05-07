import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISiteMission } from 'app/shared/model/missionService/site-mission.model';
import { SiteMissionService } from './site-mission.service';

@Component({
  templateUrl: './site-mission-delete-dialog.component.html',
})
export class SiteMissionDeleteDialogComponent {
  siteMission?: ISiteMission;

  constructor(
    protected siteMissionService: SiteMissionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.siteMissionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('siteMissionListModification');
      this.activeModal.close();
    });
  }
}
