import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITauxConsommationVehicule, TauxConsommationVehicule } from 'app/shared/model/ressourceService/taux-consommation-vehicule.model';
import { TauxConsommationVehiculeService } from './taux-consommation-vehicule.service';

@Component({
  selector: 'jhi-taux-consommation-vehicule-update',
  templateUrl: './taux-consommation-vehicule-update.component.html',
})
export class TauxConsommationVehiculeUpdateComponent implements OnInit {
  isSaving = false;
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    valeur: [null, [Validators.required]],
  });

  constructor(
    protected tauxConsommationVehiculeService: TauxConsommationVehiculeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tauxConsommationVehicule }) => {
      this.updateForm(tauxConsommationVehicule);
    });
  }

  updateForm(tauxConsommationVehicule: ITauxConsommationVehicule): void {
    this.editForm.patchValue({
      id: tauxConsommationVehicule.id,
      date: tauxConsommationVehicule.date,
      valeur: tauxConsommationVehicule.valeur,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tauxConsommationVehicule = this.createFromForm();
    if (tauxConsommationVehicule.id !== undefined) {
      this.subscribeToSaveResponse(this.tauxConsommationVehiculeService.update(tauxConsommationVehicule));
    } else {
      this.subscribeToSaveResponse(this.tauxConsommationVehiculeService.create(tauxConsommationVehicule));
    }
  }

  private createFromForm(): ITauxConsommationVehicule {
    return {
      ...new TauxConsommationVehicule(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value,
      valeur: this.editForm.get(['valeur'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITauxConsommationVehicule>>): void {
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
