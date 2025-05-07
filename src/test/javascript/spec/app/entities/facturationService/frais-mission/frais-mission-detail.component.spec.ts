import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { FraisMissionDetailComponent } from 'app/entities/facturationService/frais-mission/frais-mission-detail.component';
import { FraisMission } from 'app/shared/model/facturationService/frais-mission.model';

describe('Component Tests', () => {
  describe('FraisMission Management Detail Component', () => {
    let comp: FraisMissionDetailComponent;
    let fixture: ComponentFixture<FraisMissionDetailComponent>;
    const route = ({ data: of({ fraisMission: new FraisMission(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [FraisMissionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(FraisMissionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FraisMissionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load fraisMission on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.fraisMission).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
