import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { FraisMissionUpdateComponent } from 'app/entities/facturationService/frais-mission/frais-mission-update.component';
import { FraisMissionService } from 'app/entities/facturationService/frais-mission/frais-mission.service';
import { FraisMission } from 'app/shared/model/facturationService/frais-mission.model';

describe('Component Tests', () => {
  describe('FraisMission Management Update Component', () => {
    let comp: FraisMissionUpdateComponent;
    let fixture: ComponentFixture<FraisMissionUpdateComponent>;
    let service: FraisMissionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [FraisMissionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(FraisMissionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FraisMissionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FraisMissionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FraisMission(123);
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
        const entity = new FraisMission();
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
