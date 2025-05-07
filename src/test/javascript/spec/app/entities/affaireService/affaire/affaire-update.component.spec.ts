import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { AffaireUpdateComponent } from 'app/entities/affaireService/affaire/affaire-update.component';
import { AffaireService } from 'app/entities/affaireService/affaire/affaire.service';
import { Affaire } from 'app/shared/model/affaireService/affaire.model';

describe('Component Tests', () => {
  describe('Affaire Management Update Component', () => {
    let comp: AffaireUpdateComponent;
    let fixture: ComponentFixture<AffaireUpdateComponent>;
    let service: AffaireService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [AffaireUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AffaireUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AffaireUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AffaireService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Affaire(123);
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
        const entity = new Affaire();
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
