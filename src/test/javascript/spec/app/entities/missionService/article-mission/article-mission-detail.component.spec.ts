import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { ArticleMissionDetailComponent } from 'app/entities/missionService/article-mission/article-mission-detail.component';
import { ArticleMission } from 'app/shared/model/missionService/article-mission.model';

describe('Component Tests', () => {
  describe('ArticleMission Management Detail Component', () => {
    let comp: ArticleMissionDetailComponent;
    let fixture: ComponentFixture<ArticleMissionDetailComponent>;
    const route = ({ data: of({ articleMission: new ArticleMission(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [ArticleMissionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ArticleMissionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ArticleMissionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load articleMission on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.articleMission).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
