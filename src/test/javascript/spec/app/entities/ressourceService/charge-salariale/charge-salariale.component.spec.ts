import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { GpmGatewayTestModule } from '../../../../test.module';
import { ChargeSalarialeComponent } from 'app/entities/ressourceService/charge-salariale/charge-salariale.component';
import { ChargeSalarialeService } from 'app/entities/ressourceService/charge-salariale/charge-salariale.service';
import { ChargeSalariale } from 'app/shared/model/ressourceService/charge-salariale.model';

describe('Component Tests', () => {
  describe('ChargeSalariale Management Component', () => {
    let comp: ChargeSalarialeComponent;
    let fixture: ComponentFixture<ChargeSalarialeComponent>;
    let service: ChargeSalarialeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [ChargeSalarialeComponent],
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
        .overrideTemplate(ChargeSalarialeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChargeSalarialeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChargeSalarialeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ChargeSalariale(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.chargeSalariales && comp.chargeSalariales[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ChargeSalariale(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.chargeSalariales && comp.chargeSalariales[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
