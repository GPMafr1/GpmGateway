import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAffaire, Affaire } from 'app/shared/model/affaireService/affaire.model';
import { AffaireService } from './affaire.service';

@Component({
  selector: 'jhi-affaire-update',
  templateUrl: './affaire-update.component.html',
})
export class AffaireUpdateComponent implements OnInit {
  isSaving = false;
  dateDebutDp: any;
  dateClotureDp: any;
  datePassageExecutionDp: any;

  editForm = this.fb.group({
    id: [],
    numeroAffaire: [null, [Validators.required, Validators.pattern('AfAA[0-9]{4}')]],
    designationAffaire: [null, [Validators.required]],
    bonDeCommande: [],
    montant: [],
    devise: [],
    dateDebut: [null, [Validators.required]],
    dateCloture: [],
    datePassageExecution: [],
    lieuMultipleParMission: [],
    montantVente: [],
    montantBudgetaireMateriel: [],
    montantBudgetaireService: [],
    statut: [null, [Validators.required]],
  });

  constructor(protected affaireService: AffaireService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ affaire }) => {
      this.updateForm(affaire);
    });
  }

  updateForm(affaire: IAffaire): void {
    this.editForm.patchValue({
      id: affaire.id,
      numeroAffaire: affaire.numeroAffaire,
      designationAffaire: affaire.designationAffaire,
      bonDeCommande: affaire.bonDeCommande,
      montant: affaire.montant,
      devise: affaire.devise,
      dateDebut: affaire.dateDebut,
      dateCloture: affaire.dateCloture,
      datePassageExecution: affaire.datePassageExecution,
      lieuMultipleParMission: affaire.lieuMultipleParMission,
      montantVente: affaire.montantVente,
      montantBudgetaireMateriel: affaire.montantBudgetaireMateriel,
      montantBudgetaireService: affaire.montantBudgetaireService,
      statut: affaire.statut,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const affaire = this.createFromForm();
    if (affaire.id !== undefined) {
      this.subscribeToSaveResponse(this.affaireService.update(affaire));
    } else {
      this.subscribeToSaveResponse(this.affaireService.create(affaire));
    }
  }

  private createFromForm(): IAffaire {
    return {
      ...new Affaire(),
      id: this.editForm.get(['id'])!.value,
      numeroAffaire: this.editForm.get(['numeroAffaire'])!.value,
      designationAffaire: this.editForm.get(['designationAffaire'])!.value,
      bonDeCommande: this.editForm.get(['bonDeCommande'])!.value,
      montant: this.editForm.get(['montant'])!.value,
      devise: this.editForm.get(['devise'])!.value,
      dateDebut: this.editForm.get(['dateDebut'])!.value,
      dateCloture: this.editForm.get(['dateCloture'])!.value,
      datePassageExecution: this.editForm.get(['datePassageExecution'])!.value,
      lieuMultipleParMission: this.editForm.get(['lieuMultipleParMission'])!.value,
      montantVente: this.editForm.get(['montantVente'])!.value,
      montantBudgetaireMateriel: this.editForm.get(['montantBudgetaireMateriel'])!.value,
      montantBudgetaireService: this.editForm.get(['montantBudgetaireService'])!.value,
      statut: this.editForm.get(['statut'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAffaire>>): void {
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
