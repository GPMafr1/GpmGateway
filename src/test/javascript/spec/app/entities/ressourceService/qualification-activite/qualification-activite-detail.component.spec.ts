import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { QualificationActiviteDetailComponent } from 'app/entities/ressourceService/qualification-activite/qualification-activite-detail.component';
import { QualificationActivite } from 'app/shared/model/ressourceService/qualification-activite.model';

describe('Component Tests', () => {
  describe('QualificationActivite Management Detail Component', () => {
    let comp: QualificationActiviteDetailComponent;
    let fixture: ComponentFixture<QualificationActiviteDetailComponent>;
    const route = ({ data: of({ qualificationActivite: new QualificationActivite(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [QualificationActiviteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(QualificationActiviteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(QualificationActiviteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load qualificationActivite on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.qualificationActivite).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
