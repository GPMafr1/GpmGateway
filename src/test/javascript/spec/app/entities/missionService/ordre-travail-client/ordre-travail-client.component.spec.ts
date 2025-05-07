import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { GpmGatewayTestModule } from '../../../../test.module';
import { OrdreTravailClientComponent } from 'app/entities/missionService/ordre-travail-client/ordre-travail-client.component';
import { OrdreTravailClientService } from 'app/entities/missionService/ordre-travail-client/ordre-travail-client.service';
import { OrdreTravailClient } from 'app/shared/model/missionService/ordre-travail-client.model';

describe('Component Tests', () => {
  describe('OrdreTravailClient Management Component', () => {
    let comp: OrdreTravailClientComponent;
    let fixture: ComponentFixture<OrdreTravailClientComponent>;
    let service: OrdreTravailClientService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [OrdreTravailClientComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: of({
                defaultSort: 'id,asc',
              }),
              queryParamMap: of(
                convertToParamMap({
                  page: '1',
                  size: '1',
                  sort: 'id,desc',
                })
              ),
            },
          },
        ],
      })
        .overrideTemplate(OrdreTravailClientComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrdreTravailClientComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrdreTravailClientService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OrdreTravailClient(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ordreTravailClients && comp.ordreTravailClients[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OrdreTravailClient(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ordreTravailClients && comp.ordreTravailClients[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
