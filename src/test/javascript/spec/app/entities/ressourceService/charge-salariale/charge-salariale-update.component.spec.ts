import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { ChargeSalarialeUpdateComponent } from 'app/entities/ressourceService/charge-salariale/charge-salariale-update.component';
import { ChargeSalarialeService } from 'app/entities/ressourceService/charge-salariale/charge-salariale.service';
import { ChargeSalariale } from 'app/shared/model/ressourceService/charge-salariale.model';

describe('Component Tests', () => {
  describe('ChargeSalariale Management Update Component', () => {
    let comp: ChargeSalarialeUpdateComponent;
    let fixture: ComponentFixture<ChargeSalarialeUpdateComponent>;
    let service: ChargeSalarialeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [ChargeSalarialeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ChargeSalarialeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChargeSalarialeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChargeSalarialeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ChargeSalariale(123);
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
        const entity = new ChargeSalariale();
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
