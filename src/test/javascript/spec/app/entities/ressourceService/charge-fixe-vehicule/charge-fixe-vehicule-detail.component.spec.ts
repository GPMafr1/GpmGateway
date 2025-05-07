import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { ChargeFixeVehiculeDetailComponent } from 'app/entities/ressourceService/charge-fixe-vehicule/charge-fixe-vehicule-detail.component';
import { ChargeFixeVehicule } from 'app/shared/model/ressourceService/charge-fixe-vehicule.model';

describe('Component Tests', () => {
  describe('ChargeFixeVehicule Management Detail Component', () => {
    let comp: ChargeFixeVehiculeDetailComponent;
    let fixture: ComponentFixture<ChargeFixeVehiculeDetailComponent>;
    const route = ({ data: of({ chargeFixeVehicule: new ChargeFixeVehicule(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [ChargeFixeVehiculeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ChargeFixeVehiculeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChargeFixeVehiculeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load chargeFixeVehicule on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.chargeFixeVehicule).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
