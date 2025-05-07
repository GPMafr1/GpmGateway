import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { GpmGatewayTestModule } from '../../../../test.module';
import { TauxConsommationVehiculeComponent } from 'app/entities/ressourceService/taux-consommation-vehicule/taux-consommation-vehicule.component';
import { TauxConsommationVehiculeService } from 'app/entities/ressourceService/taux-consommation-vehicule/taux-consommation-vehicule.service';
import { TauxConsommationVehicule } from 'app/shared/model/ressourceService/taux-consommation-vehicule.model';

describe('Component Tests', () => {
  describe('TauxConsommationVehicule Management Component', () => {
    let comp: TauxConsommationVehiculeComponent;
    let fixture: ComponentFixture<TauxConsommationVehiculeComponent>;
    let service: TauxConsommationVehiculeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [TauxConsommationVehiculeComponent],
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
        .overrideTemplate(TauxConsommationVehiculeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TauxConsommationVehiculeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TauxConsommationVehiculeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TauxConsommationVehicule(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tauxConsommationVehicules && comp.tauxConsommationVehicules[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TauxConsommationVehicule(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tauxConsommationVehicules && comp.tauxConsommationVehicules[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
