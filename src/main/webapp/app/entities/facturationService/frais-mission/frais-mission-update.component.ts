import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFraisMission, FraisMission } from 'app/shared/model/facturationService/frais-mission.model';
import { FraisMissionService } from './frais-mission.service';

@Component({
  selector: 'jhi-frais-mission-update',
  templateUrl: './frais-mission-update.component.html',
})
export class FraisMissionUpdateComponent implements OnInit {
  isSaving = false;
  dateDebutDp: any;
  dateFinDp: any;

  editForm = this.fb.group({
    id: [],
    dateDebut: [null, [Validators.required]],
    dateFin: [null, [Validators.required]],
    montantTotal: [null, [Validators.required]],
    avanceRecue: [null, [Validators.required]],
    netAPayer: [null, [Validators.required]],
  });

  constructor(protected fraisMissionService: FraisMissionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fraisMission }) => {
      this.updateForm(fraisMission);
    });
  }

  updateForm(fraisMission: IFraisMission): void {
    this.editForm.patchValue({
      id: fraisMission.id,
      dateDebut: fraisMission.dateDebut,
      dateFin: fraisMission.dateFin,
      montantTotal: fraisMission.montantTotal,
      avanceRecue: fraisMission.avanceRecue,
      netAPayer: fraisMission.netAPayer,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fraisMission = this.createFromForm();
    if (fraisMission.id !== undefined) {
      this.subscribeToSaveResponse(this.fraisMissionService.update(fraisMission));
    } else {
      this.subscribeToSaveResponse(this.fraisMissionService.create(fraisMission));
    }
  }

  private createFromForm(): IFraisMission {
    return {
      ...new FraisMission(),
      id: this.editForm.get(['id'])!.value,
      dateDebut: this.editForm.get(['dateDebut'])!.value,
      dateFin: this.editForm.get(['dateFin'])!.value,
      montantTotal: this.editForm.get(['montantTotal'])!.value,
      avanceRecue: this.editForm.get(['avanceRecue'])!.value,
      netAPayer: this.editForm.get(['netAPayer'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFraisMission>>): void {
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
