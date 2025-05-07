import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { SSTUpdateComponent } from 'app/entities/missionService/sst/sst-update.component';
import { SSTService } from 'app/entities/missionService/sst/sst.service';
import { SST } from 'app/shared/model/missionService/sst.model';

describe('Component Tests', () => {
  describe('SST Management Update Component', () => {
    let comp: SSTUpdateComponent;
    let fixture: ComponentFixture<SSTUpdateComponent>;
    let service: SSTService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [SSTUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SSTUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SSTUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SSTService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SST(123);
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
        const entity = new SST();
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
