import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISociete, Societe } from 'app/shared/model/clientService/societe.model';
import { SocieteService } from './societe.service';

@Component({
  selector: 'jhi-societe-update',
  templateUrl: './societe-update.component.html',
})
export class SocieteUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    raisonSociale: [null, [Validators.required]],
    raisonSocialeAbrege: [null, [Validators.required]],
    identifiantUnique: [null, [Validators.required]],
    registreCommerce: [null, [Validators.required]],
    codeArticle: [null, [Validators.required]],
    adresse: [null, [Validators.required]],
    codePostal: [null, [Validators.required]],
    pays: [null, [Validators.required]],
    telephone: [],
    fax: [],
    email: [null, [Validators.pattern('^[^@\\\\s]+@[^@\\\\s]+\\\\.[^@\\\\s]+$')]],
  });

  constructor(protected societeService: SocieteService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ societe }) => {
      this.updateForm(societe);
    });
  }

  updateForm(societe: ISociete): void {
    this.editForm.patchValue({
      id: societe.id,
      raisonSociale: societe.raisonSociale,
      raisonSocialeAbrege: societe.raisonSocialeAbrege,
      identifiantUnique: societe.identifiantUnique,
      registreCommerce: societe.registreCommerce,
      codeArticle: societe.codeArticle,
      adresse: societe.adresse,
      codePostal: societe.codePostal,
      pays: societe.pays,
      telephone: societe.telephone,
      fax: societe.fax,
      email: societe.email,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const societe = this.createFromForm();
    if (societe.id !== undefined) {
      this.subscribeToSaveResponse(this.societeService.update(societe));
    } else {
      this.subscribeToSaveResponse(this.societeService.create(societe));
    }
  }

  private createFromForm(): ISociete {
    return {
      ...new Societe(),
      id: this.editForm.get(['id'])!.value,
      raisonSociale: this.editForm.get(['raisonSociale'])!.value,
      raisonSocialeAbrege: this.editForm.get(['raisonSocialeAbrege'])!.value,
      identifiantUnique: this.editForm.get(['identifiantUnique'])!.value,
      registreCommerce: this.editForm.get(['registreCommerce'])!.value,
      codeArticle: this.editForm.get(['codeArticle'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
      codePostal: this.editForm.get(['codePostal'])!.value,
      pays: this.editForm.get(['pays'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
      fax: this.editForm.get(['fax'])!.value,
      email: this.editForm.get(['email'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISociete>>): void {
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
