import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IOrdreTravailClient, OrdreTravailClient } from 'app/shared/model/missionService/ordre-travail-client.model';
import { OrdreTravailClientService } from './ordre-travail-client.service';

@Component({
  selector: 'jhi-ordre-travail-client-update',
  templateUrl: './ordre-travail-client-update.component.html',
})
export class OrdreTravailClientUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    demandeur: [],
    origine: [],
    motif: [null, [Validators.required]],
  });

  constructor(
    protected ordreTravailClientService: OrdreTravailClientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ordreTravailClient }) => {
      this.updateForm(ordreTravailClient);
    });
  }

  updateForm(ordreTravailClient: IOrdreTravailClient): void {
    this.editForm.patchValue({
      id: ordreTravailClient.id,
      demandeur: ordreTravailClient.demandeur,
      origine: ordreTravailClient.origine,
      motif: ordreTravailClient.motif,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ordreTravailClient = this.createFromForm();
    if (ordreTravailClient.id !== undefined) {
      this.subscribeToSaveResponse(this.ordreTravailClientService.update(ordreTravailClient));
    } else {
      this.subscribeToSaveResponse(this.ordreTravailClientService.create(ordreTravailClient));
    }
  }

  private createFromForm(): IOrdreTravailClient {
    return {
      ...new OrdreTravailClient(),
      id: this.editForm.get(['id'])!.value,
      demandeur: this.editForm.get(['demandeur'])!.value,
      origine: this.editForm.get(['origine'])!.value,
      motif: this.editForm.get(['motif'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrdreTravailClient>>): void {
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
