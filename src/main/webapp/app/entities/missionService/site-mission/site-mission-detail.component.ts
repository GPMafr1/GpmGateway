import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISiteMission } from 'app/shared/model/missionService/site-mission.model';

@Component({
  selector: 'jhi-site-mission-detail',
  templateUrl: './site-mission-detail.component.html',
})
export class SiteMissionDetailComponent implements OnInit {
  siteMission: ISiteMission | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ siteMission }) => (this.siteMission = siteMission));
  }

  previousState(): void {
    window.history.back();
  }
}
