import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAffaire } from 'app/shared/model/affaireService/affaire.model';

@Component({
  selector: 'jhi-affaire-detail',
  templateUrl: './affaire-detail.component.html',
})
export class AffaireDetailComponent implements OnInit {
  affaire: IAffaire | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ affaire }) => (this.affaire = affaire));
  }

  previousState(): void {
    window.history.back();
  }
}
