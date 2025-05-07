import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IQualificationActivite, QualificationActivite } from 'app/shared/model/ressourceService/qualification-activite.model';
import { QualificationActiviteService } from './qualification-activite.service';

@Component({
  selector: 'jhi-qualification-activite-update',
  templateUrl: './qualification-activite-update.component.html',
})
export class QualificationActiviteUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    designation: [null, [Validators.required]],
    niveau: [null, [Validators.required]],
  });

  constructor(
    protected qualificationActiviteService: QualificationActiviteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ qualificationActivite }) => {
      this.updateForm(qualificationActivite);
    });
  }

  updateForm(qualificationActivite: IQualificationActivite): void {
    this.editForm.patchValue({
      id: qualificationActivite.id,
      code: qualificationActivite.code,
      designation: qualificationActivite.designation,
      niveau: qualificationActivite.niveau,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const qualificationActivite = this.createFromForm();
    if (qualificationActivite.id !== undefined) {
      this.subscribeToSaveResponse(this.qualificationActiviteService.update(qualificationActivite));
    } else {
      this.subscribeToSaveResponse(this.qualificationActiviteService.create(qualificationActivite));
    }
  }

  private createFromForm(): IQualificationActivite {
    return {
      ...new QualificationActivite(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      designation: this.editForm.get(['designation'])!.value,
      niveau: this.editForm.get(['niveau'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQualificationActivite>>): void {
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
