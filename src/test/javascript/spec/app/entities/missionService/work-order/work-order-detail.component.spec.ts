import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { WorkOrderDetailComponent } from 'app/entities/missionService/work-order/work-order-detail.component';
import { WorkOrder } from 'app/shared/model/missionService/work-order.model';

describe('Component Tests', () => {
  describe('WorkOrder Management Detail Component', () => {
    let comp: WorkOrderDetailComponent;
    let fixture: ComponentFixture<WorkOrderDetailComponent>;
    const route = ({ data: of({ workOrder: new WorkOrder(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [WorkOrderDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(WorkOrderDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WorkOrderDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load workOrder on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.workOrder).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
