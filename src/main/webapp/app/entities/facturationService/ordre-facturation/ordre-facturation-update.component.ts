import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IOrdreFacturation, OrdreFacturation } from 'app/shared/model/facturationService/ordre-facturation.model';
import { OrdreFacturationService } from './ordre-facturation.service';

@Component({
  selector: 'jhi-ordre-facturation-update',
  templateUrl: './ordre-facturation-update.component.html',
})
export class OrdreFacturationUpdateComponent implements OnInit {
  isSaving = false;
  dateFactureDp: any;
  dateEcheanceDp: any;
  dateDechargeDp: any;

  editForm = this.fb.group({
    id: [],
    devis: [null, [Validators.required]],
    bonDeCommande: [null, [Validators.required]],
    numeroFacture: [null, [Validators.required]],
    montantFacture: [null, [Validators.required]],
    dateFacture: [null, [Validators.required]],
    dateEcheance: [null, [Validators.required]],
    dateDecharge: [null, [Validators.required]],
  });

  constructor(
    protected ordreFacturationService: OrdreFacturationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ordreFacturation }) => {
      this.updateForm(ordreFacturation);
    });
  }

  updateForm(ordreFacturation: IOrdreFacturation): void {
    this.editForm.patchValue({
      id: ordreFacturation.id,
      devis: ordreFacturation.devis,
      bonDeCommande: ordreFacturation.bonDeCommande,
      numeroFacture: ordreFacturation.numeroFacture,
      montantFacture: ordreFacturation.montantFacture,
      dateFacture: ordreFacturation.dateFacture,
      dateEcheance: ordreFacturation.dateEcheance,
      dateDecharge: ordreFacturation.dateDecharge,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ordreFacturation = this.createFromForm();
    if (ordreFacturation.id !== undefined) {
      this.subscribeToSaveResponse(this.ordreFacturationService.update(ordreFacturation));
    } else {
      this.subscribeToSaveResponse(this.ordreFacturationService.create(ordreFacturation));
    }
  }

  private createFromForm(): IOrdreFacturation {
    return {
      ...new OrdreFacturation(),
      id: this.editForm.get(['id'])!.value,
      devis: this.editForm.get(['devis'])!.value,
      bonDeCommande: this.editForm.get(['bonDeCommande'])!.value,
      numeroFacture: this.editForm.get(['numeroFacture'])!.value,
      montantFacture: this.editForm.get(['montantFacture'])!.value,
      dateFacture: this.editForm.get(['dateFacture'])!.value,
      dateEcheance: this.editForm.get(['dateEcheance'])!.value,
      dateDecharge: this.editForm.get(['dateDecharge'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrdreFacturation>>): void {
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
