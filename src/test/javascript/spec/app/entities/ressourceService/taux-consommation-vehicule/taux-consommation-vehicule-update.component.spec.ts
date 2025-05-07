import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { TauxConsommationVehiculeUpdateComponent } from 'app/entities/ressourceService/taux-consommation-vehicule/taux-consommation-vehicule-update.component';
import { TauxConsommationVehiculeService } from 'app/entities/ressourceService/taux-consommation-vehicule/taux-consommation-vehicule.service';
import { TauxConsommationVehicule } from 'app/shared/model/ressourceService/taux-consommation-vehicule.model';

describe('Component Tests', () => {
  describe('TauxConsommationVehicule Management Update Component', () => {
    let comp: TauxConsommationVehiculeUpdateComponent;
    let fixture: ComponentFixture<TauxConsommationVehiculeUpdateComponent>;
    let service: TauxConsommationVehiculeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [TauxConsommationVehiculeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TauxConsommationVehiculeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TauxConsommationVehiculeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TauxConsommationVehiculeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TauxConsommationVehicule(123);
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
        const entity = new TauxConsommationVehicule();
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
