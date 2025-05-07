import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChargeFixeVehicule } from 'app/shared/model/ressourceService/charge-fixe-vehicule.model';

@Component({
  selector: 'jhi-charge-fixe-vehicule-detail',
  templateUrl: './charge-fixe-vehicule-detail.component.html',
})
export class ChargeFixeVehiculeDetailComponent implements OnInit {
  chargeFixeVehicule: IChargeFixeVehicule | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chargeFixeVehicule }) => (this.chargeFixeVehicule = chargeFixeVehicule));
  }

  previousState(): void {
    window.history.back();
  }
}
