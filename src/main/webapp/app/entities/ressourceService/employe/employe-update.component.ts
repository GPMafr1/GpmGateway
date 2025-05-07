import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEmploye, Employe } from 'app/shared/model/ressourceService/employe.model';
import { EmployeService } from './employe.service';

@Component({
  selector: 'jhi-employe-update',
  templateUrl: './employe-update.component.html',
})
export class EmployeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    matricule: [null, [Validators.required]],
    prenomNom: [null, [Validators.required]],
    attribut: [null, [Validators.required]],
    chefProjet: [null, [Validators.required]],
    numeroPermis: [],
    numeroCIN: [],
  });

  constructor(protected employeService: EmployeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employe }) => {
      this.updateForm(employe);
    });
  }

  updateForm(employe: IEmploye): void {
    this.editForm.patchValue({
      id: employe.id,
      matricule: employe.matricule,
      prenomNom: employe.prenomNom,
      attribut: employe.attribut,
      chefProjet: employe.chefProjet,
      numeroPermis: employe.numeroPermis,
      numeroCIN: employe.numeroCIN,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employe = this.createFromForm();
    if (employe.id !== undefined) {
      this.subscribeToSaveResponse(this.employeService.update(employe));
    } else {
      this.subscribeToSaveResponse(this.employeService.create(employe));
    }
  }

  private createFromForm(): IEmploye {
    return {
      ...new Employe(),
      id: this.editForm.get(['id'])!.value,
      matricule: this.editForm.get(['matricule'])!.value,
      prenomNom: this.editForm.get(['prenomNom'])!.value,
      attribut: this.editForm.get(['attribut'])!.value,
      chefProjet: this.editForm.get(['chefProjet'])!.value,
      numeroPermis: this.editForm.get(['numeroPermis'])!.value,
      numeroCIN: this.editForm.get(['numeroCIN'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmploye>>): void {
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
