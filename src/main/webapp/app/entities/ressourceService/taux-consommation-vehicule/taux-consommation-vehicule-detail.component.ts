import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITauxConsommationVehicule } from 'app/shared/model/ressourceService/taux-consommation-vehicule.model';

@Component({
  selector: 'jhi-taux-consommation-vehicule-detail',
  templateUrl: './taux-consommation-vehicule-detail.component.html',
})
export class TauxConsommationVehiculeDetailComponent implements OnInit {
  tauxConsommationVehicule: ITauxConsommationVehicule | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tauxConsommationVehicule }) => (this.tauxConsommationVehicule = tauxConsommationVehicule));
  }

  previousState(): void {
    window.history.back();
  }
}
