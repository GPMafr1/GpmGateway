import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { TauxConsommationVehiculeDetailComponent } from 'app/entities/ressourceService/taux-consommation-vehicule/taux-consommation-vehicule-detail.component';
import { TauxConsommationVehicule } from 'app/shared/model/ressourceService/taux-consommation-vehicule.model';

describe('Component Tests', () => {
  describe('TauxConsommationVehicule Management Detail Component', () => {
    let comp: TauxConsommationVehiculeDetailComponent;
    let fixture: ComponentFixture<TauxConsommationVehiculeDetailComponent>;
    const route = ({ data: of({ tauxConsommationVehicule: new TauxConsommationVehicule(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [TauxConsommationVehiculeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TauxConsommationVehiculeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TauxConsommationVehiculeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tauxConsommationVehicule on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tauxConsommationVehicule).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
