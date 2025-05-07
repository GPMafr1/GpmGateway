import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IChargeSalariale, ChargeSalariale } from 'app/shared/model/ressourceService/charge-salariale.model';
import { ChargeSalarialeService } from './charge-salariale.service';

@Component({
  selector: 'jhi-charge-salariale-update',
  templateUrl: './charge-salariale-update.component.html',
})
export class ChargeSalarialeUpdateComponent implements OnInit {
  isSaving = false;
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    valeur: [null, [Validators.required]],
  });

  constructor(
    protected chargeSalarialeService: ChargeSalarialeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chargeSalariale }) => {
      this.updateForm(chargeSalariale);
    });
  }

  updateForm(chargeSalariale: IChargeSalariale): void {
    this.editForm.patchValue({
      id: chargeSalariale.id,
      date: chargeSalariale.date,
      valeur: chargeSalariale.valeur,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chargeSalariale = this.createFromForm();
    if (chargeSalariale.id !== undefined) {
      this.subscribeToSaveResponse(this.chargeSalarialeService.update(chargeSalariale));
    } else {
      this.subscribeToSaveResponse(this.chargeSalarialeService.create(chargeSalariale));
    }
  }

  private createFromForm(): IChargeSalariale {
    return {
      ...new ChargeSalariale(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value,
      valeur: this.editForm.get(['valeur'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChargeSalariale>>): void {
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
