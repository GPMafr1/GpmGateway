import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrdreFacturation } from 'app/shared/model/facturationService/ordre-facturation.model';

@Component({
  selector: 'jhi-ordre-facturation-detail',
  templateUrl: './ordre-facturation-detail.component.html',
})
export class OrdreFacturationDetailComponent implements OnInit {
  ordreFacturation: IOrdreFacturation | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ordreFacturation }) => (this.ordreFacturation = ordreFacturation));
  }

  previousState(): void {
    window.history.back();
  }
}
