import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPieceJointe } from 'app/shared/model/missionService/piece-jointe.model';
import { PieceJointeService } from './piece-jointe.service';

@Component({
  templateUrl: './piece-jointe-delete-dialog.component.html',
})
export class PieceJointeDeleteDialogComponent {
  pieceJointe?: IPieceJointe;

  constructor(
    protected pieceJointeService: PieceJointeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pieceJointeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('pieceJointeListModification');
      this.activeModal.close();
    });
  }
}
