import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { ChargeFixeVehiculeUpdateComponent } from 'app/entities/ressourceService/charge-fixe-vehicule/charge-fixe-vehicule-update.component';
import { ChargeFixeVehiculeService } from 'app/entities/ressourceService/charge-fixe-vehicule/charge-fixe-vehicule.service';
import { ChargeFixeVehicule } from 'app/shared/model/ressourceService/charge-fixe-vehicule.model';

describe('Component Tests', () => {
  describe('ChargeFixeVehicule Management Update Component', () => {
    let comp: ChargeFixeVehiculeUpdateComponent;
    let fixture: ComponentFixture<ChargeFixeVehiculeUpdateComponent>;
    let service: ChargeFixeVehiculeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [ChargeFixeVehiculeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ChargeFixeVehiculeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChargeFixeVehiculeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChargeFixeVehiculeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ChargeFixeVehicule(123);
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
        const entity = new ChargeFixeVehicule();
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
