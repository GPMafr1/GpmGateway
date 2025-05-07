import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISST, SST } from 'app/shared/model/missionService/sst.model';
import { SSTService } from './sst.service';

@Component({
  selector: 'jhi-sst-update',
  templateUrl: './sst-update.component.html',
})
export class SSTUpdateComponent implements OnInit {
  isSaving = false;
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    label: [],
    date: [],
    importance: [],
    commentaire: [],
  });

  constructor(protected sSTService: SSTService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sST }) => {
      this.updateForm(sST);
    });
  }

  updateForm(sST: ISST): void {
    this.editForm.patchValue({
      id: sST.id,
      label: sST.label,
      date: sST.date,
      importance: sST.importance,
      commentaire: sST.commentaire,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sST = this.createFromForm();
    if (sST.id !== undefined) {
      this.subscribeToSaveResponse(this.sSTService.update(sST));
    } else {
      this.subscribeToSaveResponse(this.sSTService.create(sST));
    }
  }

  private createFromForm(): ISST {
    return {
      ...new SST(),
      id: this.editForm.get(['id'])!.value,
      label: this.editForm.get(['label'])!.value,
      date: this.editForm.get(['date'])!.value,
      importance: this.editForm.get(['importance'])!.value,
      commentaire: this.editForm.get(['commentaire'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISST>>): void {
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
