import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { SiteMissionUpdateComponent } from 'app/entities/missionService/site-mission/site-mission-update.component';
import { SiteMissionService } from 'app/entities/missionService/site-mission/site-mission.service';
import { SiteMission } from 'app/shared/model/missionService/site-mission.model';

describe('Component Tests', () => {
  describe('SiteMission Management Update Component', () => {
    let comp: SiteMissionUpdateComponent;
    let fixture: ComponentFixture<SiteMissionUpdateComponent>;
    let service: SiteMissionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [SiteMissionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SiteMissionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SiteMissionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SiteMissionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SiteMission(123);
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
        const entity = new SiteMission();
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
