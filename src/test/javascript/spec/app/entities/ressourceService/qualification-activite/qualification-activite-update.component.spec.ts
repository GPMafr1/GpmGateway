import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { QualificationActiviteUpdateComponent } from 'app/entities/ressourceService/qualification-activite/qualification-activite-update.component';
import { QualificationActiviteService } from 'app/entities/ressourceService/qualification-activite/qualification-activite.service';
import { QualificationActivite } from 'app/shared/model/ressourceService/qualification-activite.model';

describe('Component Tests', () => {
  describe('QualificationActivite Management Update Component', () => {
    let comp: QualificationActiviteUpdateComponent;
    let fixture: ComponentFixture<QualificationActiviteUpdateComponent>;
    let service: QualificationActiviteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [QualificationActiviteUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(QualificationActiviteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(QualificationActiviteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(QualificationActiviteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new QualificationActivite(123);
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
        const entity = new QualificationActivite();
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
