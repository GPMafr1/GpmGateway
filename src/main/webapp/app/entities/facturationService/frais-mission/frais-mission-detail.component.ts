import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFraisMission } from 'app/shared/model/facturationService/frais-mission.model';

@Component({
  selector: 'jhi-frais-mission-detail',
  templateUrl: './frais-mission-detail.component.html',
})
export class FraisMissionDetailComponent implements OnInit {
  fraisMission: IFraisMission | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fraisMission }) => (this.fraisMission = fraisMission));
  }

  previousState(): void {
    window.history.back();
  }
}
