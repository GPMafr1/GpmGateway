import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IChargeFixeVehicule, ChargeFixeVehicule } from 'app/shared/model/ressourceService/charge-fixe-vehicule.model';
import { ChargeFixeVehiculeService } from './charge-fixe-vehicule.service';

@Component({
  selector: 'jhi-charge-fixe-vehicule-update',
  templateUrl: './charge-fixe-vehicule-update.component.html',
})
export class ChargeFixeVehiculeUpdateComponent implements OnInit {
  isSaving = false;
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    valeur: [null, [Validators.required]],
  });

  constructor(
    protected chargeFixeVehiculeService: ChargeFixeVehiculeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chargeFixeVehicule }) => {
      this.updateForm(chargeFixeVehicule);
    });
  }

  updateForm(chargeFixeVehicule: IChargeFixeVehicule): void {
    this.editForm.patchValue({
      id: chargeFixeVehicule.id,
      date: chargeFixeVehicule.date,
      valeur: chargeFixeVehicule.valeur,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chargeFixeVehicule = this.createFromForm();
    if (chargeFixeVehicule.id !== undefined) {
      this.subscribeToSaveResponse(this.chargeFixeVehiculeService.update(chargeFixeVehicule));
    } else {
      this.subscribeToSaveResponse(this.chargeFixeVehiculeService.create(chargeFixeVehicule));
    }
  }

  private createFromForm(): IChargeFixeVehicule {
    return {
      ...new ChargeFixeVehicule(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value,
      valeur: this.editForm.get(['valeur'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChargeFixeVehicule>>): void {
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
