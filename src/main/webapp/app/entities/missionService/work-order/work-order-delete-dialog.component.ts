import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWorkOrder } from 'app/shared/model/missionService/work-order.model';
import { WorkOrderService } from './work-order.service';

@Component({
  templateUrl: './work-order-delete-dialog.component.html',
})
export class WorkOrderDeleteDialogComponent {
  workOrder?: IWorkOrder;

  constructor(protected workOrderService: WorkOrderService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.workOrderService.delete(id).subscribe(() => {
      this.eventManager.broadcast('workOrderListModification');
      this.activeModal.close();
    });
  }
}
