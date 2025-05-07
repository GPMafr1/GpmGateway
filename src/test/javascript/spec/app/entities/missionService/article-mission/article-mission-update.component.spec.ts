import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { ArticleMissionUpdateComponent } from 'app/entities/missionService/article-mission/article-mission-update.component';
import { ArticleMissionService } from 'app/entities/missionService/article-mission/article-mission.service';
import { ArticleMission } from 'app/shared/model/missionService/article-mission.model';

describe('Component Tests', () => {
  describe('ArticleMission Management Update Component', () => {
    let comp: ArticleMissionUpdateComponent;
    let fixture: ComponentFixture<ArticleMissionUpdateComponent>;
    let service: ArticleMissionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [ArticleMissionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ArticleMissionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ArticleMissionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ArticleMissionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ArticleMission(123);
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
        const entity = new ArticleMission();
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
