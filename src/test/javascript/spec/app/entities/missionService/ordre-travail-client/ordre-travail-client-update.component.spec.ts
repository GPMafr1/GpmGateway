import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { OrdreTravailClientUpdateComponent } from 'app/entities/missionService/ordre-travail-client/ordre-travail-client-update.component';
import { OrdreTravailClientService } from 'app/entities/missionService/ordre-travail-client/ordre-travail-client.service';
import { OrdreTravailClient } from 'app/shared/model/missionService/ordre-travail-client.model';

describe('Component Tests', () => {
  describe('OrdreTravailClient Management Update Component', () => {
    let comp: OrdreTravailClientUpdateComponent;
    let fixture: ComponentFixture<OrdreTravailClientUpdateComponent>;
    let service: OrdreTravailClientService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [OrdreTravailClientUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(OrdreTravailClientUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrdreTravailClientUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrdreTravailClientService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrdreTravailClient(123);
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
        const entity = new OrdreTravailClient();
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
