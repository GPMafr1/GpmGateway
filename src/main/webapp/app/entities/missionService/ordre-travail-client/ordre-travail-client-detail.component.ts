import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrdreTravailClient } from 'app/shared/model/missionService/ordre-travail-client.model';

@Component({
  selector: 'jhi-ordre-travail-client-detail',
  templateUrl: './ordre-travail-client-detail.component.html',
})
export class OrdreTravailClientDetailComponent implements OnInit {
  ordreTravailClient: IOrdreTravailClient | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ordreTravailClient }) => (this.ordreTravailClient = ordreTravailClient));
  }

  previousState(): void {
    window.history.back();
  }
}
