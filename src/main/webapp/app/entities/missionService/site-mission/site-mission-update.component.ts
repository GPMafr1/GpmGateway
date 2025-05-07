import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISiteMission, SiteMission } from 'app/shared/model/missionService/site-mission.model';
import { SiteMissionService } from './site-mission.service';

@Component({
  selector: 'jhi-site-mission-update',
  templateUrl: './site-mission-update.component.html',
})
export class SiteMissionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    commentaire: [],
    dateHeureDebutReel: [null, [Validators.required]],
    dateHeureFinReel: [null, [Validators.required]],
  });

  constructor(protected siteMissionService: SiteMissionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ siteMission }) => {
      if (!siteMission.id) {
        const today = moment().startOf('day');
        siteMission.dateHeureDebutReel = today;
        siteMission.dateHeureFinReel = today;
      }

      this.updateForm(siteMission);
    });
  }

  updateForm(siteMission: ISiteMission): void {
    this.editForm.patchValue({
      id: siteMission.id,
      code: siteMission.code,
      commentaire: siteMission.commentaire,
      dateHeureDebutReel: siteMission.dateHeureDebutReel ? siteMission.dateHeureDebutReel.format(DATE_TIME_FORMAT) : null,
      dateHeureFinReel: siteMission.dateHeureFinReel ? siteMission.dateHeureFinReel.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const siteMission = this.createFromForm();
    if (siteMission.id !== undefined) {
      this.subscribeToSaveResponse(this.siteMissionService.update(siteMission));
    } else {
      this.subscribeToSaveResponse(this.siteMissionService.create(siteMission));
    }
  }

  private createFromForm(): ISiteMission {
    return {
      ...new SiteMission(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      commentaire: this.editForm.get(['commentaire'])!.value,
      dateHeureDebutReel: this.editForm.get(['dateHeureDebutReel'])!.value
        ? moment(this.editForm.get(['dateHeureDebutReel'])!.value, DATE_TIME_FORMAT)
        : undefined,
      dateHeureFinReel: this.editForm.get(['dateHeureFinReel'])!.value
        ? moment(this.editForm.get(['dateHeureFinReel'])!.value, DATE_TIME_FORMAT)
        : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISiteMission>>): void {
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
