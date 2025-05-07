import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IArticleMission } from 'app/shared/model/missionService/article-mission.model';
import { ArticleMissionService } from './article-mission.service';

@Component({
  templateUrl: './article-mission-delete-dialog.component.html',
})
export class ArticleMissionDeleteDialogComponent {
  articleMission?: IArticleMission;

  constructor(
    protected articleMissionService: ArticleMissionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.articleMissionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('articleMissionListModification');
      this.activeModal.close();
    });
  }
}
