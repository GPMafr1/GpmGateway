import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { OrdreFacturationUpdateComponent } from 'app/entities/facturationService/ordre-facturation/ordre-facturation-update.component';
import { OrdreFacturationService } from 'app/entities/facturationService/ordre-facturation/ordre-facturation.service';
import { OrdreFacturation } from 'app/shared/model/facturationService/ordre-facturation.model';

describe('Component Tests', () => {
  describe('OrdreFacturation Management Update Component', () => {
    let comp: OrdreFacturationUpdateComponent;
    let fixture: ComponentFixture<OrdreFacturationUpdateComponent>;
    let service: OrdreFacturationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [OrdreFacturationUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(OrdreFacturationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrdreFacturationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrdreFacturationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrdreFacturation(123);
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
        const entity = new OrdreFacturation();
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
