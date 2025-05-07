import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IArticleMission, ArticleMission } from 'app/shared/model/missionService/article-mission.model';
import { ArticleMissionService } from './article-mission.service';

@Component({
  selector: 'jhi-article-mission-update',
  templateUrl: './article-mission-update.component.html',
})
export class ArticleMissionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    quantitePlanifiee: [null, [Validators.required]],
    quantiteUtilisee: [null, [Validators.required]],
  });

  constructor(protected articleMissionService: ArticleMissionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ articleMission }) => {
      this.updateForm(articleMission);
    });
  }

  updateForm(articleMission: IArticleMission): void {
    this.editForm.patchValue({
      id: articleMission.id,
      quantitePlanifiee: articleMission.quantitePlanifiee,
      quantiteUtilisee: articleMission.quantiteUtilisee,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const articleMission = this.createFromForm();
    if (articleMission.id !== undefined) {
      this.subscribeToSaveResponse(this.articleMissionService.update(articleMission));
    } else {
      this.subscribeToSaveResponse(this.articleMissionService.create(articleMission));
    }
  }

  private createFromForm(): IArticleMission {
    return {
      ...new ArticleMission(),
      id: this.editForm.get(['id'])!.value,
      quantitePlanifiee: this.editForm.get(['quantitePlanifiee'])!.value,
      quantiteUtilisee: this.editForm.get(['quantiteUtilisee'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArticleMission>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
