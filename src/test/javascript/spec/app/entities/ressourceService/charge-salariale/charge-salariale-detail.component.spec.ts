import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { ChargeSalarialeDetailComponent } from 'app/entities/ressourceService/charge-salariale/charge-salariale-detail.component';
import { ChargeSalariale } from 'app/shared/model/ressourceService/charge-salariale.model';

describe('Component Tests', () => {
  describe('ChargeSalariale Management Detail Component', () => {
    let comp: ChargeSalarialeDetailComponent;
    let fixture: ComponentFixture<ChargeSalarialeDetailComponent>;
    const route = ({ data: of({ chargeSalariale: new ChargeSalariale(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [ChargeSalarialeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ChargeSalarialeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChargeSalarialeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load chargeSalariale on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.chargeSalariale).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
