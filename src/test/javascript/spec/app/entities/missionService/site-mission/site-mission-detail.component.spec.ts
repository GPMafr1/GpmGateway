import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { SiteMissionDetailComponent } from 'app/entities/missionService/site-mission/site-mission-detail.component';
import { SiteMission } from 'app/shared/model/missionService/site-mission.model';

describe('Component Tests', () => {
  describe('SiteMission Management Detail Component', () => {
    let comp: SiteMissionDetailComponent;
    let fixture: ComponentFixture<SiteMissionDetailComponent>;
    const route = ({ data: of({ siteMission: new SiteMission(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [SiteMissionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SiteMissionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SiteMissionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load siteMission on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.siteMission).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
