import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPieceJointe } from 'app/shared/model/missionService/piece-jointe.model';

@Component({
  selector: 'jhi-piece-jointe-detail',
  templateUrl: './piece-jointe-detail.component.html',
})
export class PieceJointeDetailComponent implements OnInit {
  pieceJointe: IPieceJointe | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pieceJointe }) => (this.pieceJointe = pieceJointe));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
