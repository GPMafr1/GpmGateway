import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { EmployeUpdateComponent } from 'app/entities/ressourceService/employe/employe-update.component';
import { EmployeService } from 'app/entities/ressourceService/employe/employe.service';
import { Employe } from 'app/shared/model/ressourceService/employe.model';

describe('Component Tests', () => {
  describe('Employe Management Update Component', () => {
    let comp: EmployeUpdateComponent;
    let fixture: ComponentFixture<EmployeUpdateComponent>;
    let service: EmployeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [EmployeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(EmployeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmployeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Employe(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Employe();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
