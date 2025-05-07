import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IWorkOrder, WorkOrder } from 'app/shared/model/missionService/work-order.model';
import { WorkOrderService } from './work-order.service';

@Component({
  selector: 'jhi-work-order-update',
  templateUrl: './work-order-update.component.html',
})
export class WorkOrderUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    demandeur: [],
    motif: [null, [Validators.required]],
    dateHeureDebutPrevisionnel: [null, [Validators.required]],
    dateHeureFinPrevisionnel: [null, [Validators.required]],
    dateHeureDebutReel: [],
    dateHeureFinReel: [],
    materielUtilise: [],
    remarque: [],
    numeroFicheIntervention: [],
    hebergement: [],
  });

  constructor(protected workOrderService: WorkOrderService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ workOrder }) => {
      if (!workOrder.id) {
        const today = moment().startOf('day');
        workOrder.dateHeureDebutPrevisionnel = today;
        workOrder.dateHeureFinPrevisionnel = today;
        workOrder.dateHeureDebutReel = today;
        workOrder.dateHeureFinReel = today;
      }

      this.updateForm(workOrder);
    });
  }

  updateForm(workOrder: IWorkOrder): void {
    this.editForm.patchValue({
      id: workOrder.id,
      demandeur: workOrder.demandeur,
      motif: workOrder.motif,
      dateHeureDebutPrevisionnel: workOrder.dateHeureDebutPrevisionnel
        ? workOrder.dateHeureDebutPrevisionnel.format(DATE_TIME_FORMAT)
        : null,
      dateHeureFinPrevisionnel: workOrder.dateHeureFinPrevisionnel ? workOrder.dateHeureFinPrevisionnel.format(DATE_TIME_FORMAT) : null,
      dateHeureDebutReel: workOrder.dateHeureDebutReel ? workOrder.dateHeureDebutReel.format(DATE_TIME_FORMAT) : null,
      dateHeureFinReel: workOrder.dateHeureFinReel ? workOrder.dateHeureFinReel.format(DATE_TIME_FORMAT) : null,
      materielUtilise: workOrder.materielUtilise,
      remarque: workOrder.remarque,
      numeroFicheIntervention: workOrder.numeroFicheIntervention,
      hebergement: workOrder.hebergement,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const workOrder = this.createFromForm();
    if (workOrder.id !== undefined) {
      this.subscribeToSaveResponse(this.workOrderService.update(workOrder));
    } else {
      this.subscribeToSaveResponse(this.workOrderService.create(workOrder));
    }
  }

  private createFromForm(): IWorkOrder {
    return {
      ...new WorkOrder(),
      id: this.editForm.get(['id'])!.value,
      demandeur: this.editForm.get(['demandeur'])!.value,
      motif: this.editForm.get(['motif'])!.value,
      dateHeureDebutPrevisionnel: this.editForm.get(['dateHeureDebutPrevisionnel'])!.value
        ? moment(this.editForm.get(['dateHeureDebutPrevisionnel'])!.value, DATE_TIME_FORMAT)
        : undefined,
      dateHeureFinPrevisionnel: this.editForm.get(['dateHeureFinPrevisionnel'])!.value
        ? moment(this.editForm.get(['dateHeureFinPrevisionnel'])!.value, DATE_TIME_FORMAT)
        : undefined,
      dateHeureDebutReel: this.editForm.get(['dateHeureDebutReel'])!.value
        ? moment(this.editForm.get(['dateHeureDebutReel'])!.value, DATE_TIME_FORMAT)
        : undefined,
      dateHeureFinReel: this.editForm.get(['dateHeureFinReel'])!.value
        ? moment(this.editForm.get(['dateHeureFinReel'])!.value, DATE_TIME_FORMAT)
        : undefined,
      materielUtilise: this.editForm.get(['materielUtilise'])!.value,
      remarque: this.editForm.get(['remarque'])!.value,
      numeroFicheIntervention: this.editForm.get(['numeroFicheIntervention'])!.value,
      hebergement: this.editForm.get(['hebergement'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorkOrder>>): void {
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
