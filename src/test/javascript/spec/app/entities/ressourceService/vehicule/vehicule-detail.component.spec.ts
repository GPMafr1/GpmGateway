import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { VehiculeDetailComponent } from 'app/entities/ressourceService/vehicule/vehicule-detail.component';
import { Vehicule } from 'app/shared/model/ressourceService/vehicule.model';

describe('Component Tests', () => {
  describe('Vehicule Management Detail Component', () => {
    let comp: VehiculeDetailComponent;
    let fixture: ComponentFixture<VehiculeDetailComponent>;
    const route = ({ data: of({ vehicule: new Vehicule(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [VehiculeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(VehiculeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VehiculeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load vehicule on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.vehicule).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
