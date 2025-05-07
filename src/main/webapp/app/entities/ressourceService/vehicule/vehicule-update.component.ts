import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IVehicule, Vehicule } from 'app/shared/model/ressourceService/vehicule.model';
import { VehiculeService } from './vehicule.service';

@Component({
  selector: 'jhi-vehicule-update',
  templateUrl: './vehicule-update.component.html',
})
export class VehiculeUpdateComponent implements OnInit {
  isSaving = false;
  dateCirculationDp: any;

  editForm = this.fb.group({
    id: [],
    marque: [null, [Validators.required]],
    type: [null, [Validators.required]],
    matricule: [null, [Validators.required]],
    nbPlaces: [null, [Validators.required]],
    numeroCarteGrise: [],
    dateCirculation: [null, [Validators.required]],
    typeCarburant: [null, [Validators.required]],
  });

  constructor(protected vehiculeService: VehiculeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vehicule }) => {
      this.updateForm(vehicule);
    });
  }

  updateForm(vehicule: IVehicule): void {
    this.editForm.patchValue({
      id: vehicule.id,
      marque: vehicule.marque,
      type: vehicule.type,
      matricule: vehicule.matricule,
      nbPlaces: vehicule.nbPlaces,
      numeroCarteGrise: vehicule.numeroCarteGrise,
      dateCirculation: vehicule.dateCirculation,
      typeCarburant: vehicule.typeCarburant,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const vehicule = this.createFromForm();
    if (vehicule.id !== undefined) {
      this.subscribeToSaveResponse(this.vehiculeService.update(vehicule));
    } else {
      this.subscribeToSaveResponse(this.vehiculeService.create(vehicule));
    }
  }

  private createFromForm(): IVehicule {
    return {
      ...new Vehicule(),
      id: this.editForm.get(['id'])!.value,
      marque: this.editForm.get(['marque'])!.value,
      type: this.editForm.get(['type'])!.value,
      matricule: this.editForm.get(['matricule'])!.value,
      nbPlaces: this.editForm.get(['nbPlaces'])!.value,
      numeroCarteGrise: this.editForm.get(['numeroCarteGrise'])!.value,
      dateCirculation: this.editForm.get(['dateCirculation'])!.value,
      typeCarburant: this.editForm.get(['typeCarburant'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVehicule>>): void {
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
