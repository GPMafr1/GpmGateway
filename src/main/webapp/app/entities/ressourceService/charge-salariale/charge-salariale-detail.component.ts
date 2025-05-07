import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChargeSalariale } from 'app/shared/model/ressourceService/charge-salariale.model';

@Component({
  selector: 'jhi-charge-salariale-detail',
  templateUrl: './charge-salariale-detail.component.html',
})
export class ChargeSalarialeDetailComponent implements OnInit {
  chargeSalariale: IChargeSalariale | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chargeSalariale }) => (this.chargeSalariale = chargeSalariale));
  }

  previousState(): void {
    window.history.back();
  }
}
