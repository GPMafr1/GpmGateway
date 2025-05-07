import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQualificationActivite } from 'app/shared/model/ressourceService/qualification-activite.model';

@Component({
  selector: 'jhi-qualification-activite-detail',
  templateUrl: './qualification-activite-detail.component.html',
})
export class QualificationActiviteDetailComponent implements OnInit {
  qualificationActivite: IQualificationActivite | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ qualificationActivite }) => (this.qualificationActivite = qualificationActivite));
  }

  previousState(): void {
    window.history.back();
  }
}
