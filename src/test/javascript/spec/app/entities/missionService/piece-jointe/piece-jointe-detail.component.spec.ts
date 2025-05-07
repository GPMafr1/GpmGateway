import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { GpmGatewayTestModule } from '../../../../test.module';
import { PieceJointeDetailComponent } from 'app/entities/missionService/piece-jointe/piece-jointe-detail.component';
import { PieceJointe } from 'app/shared/model/missionService/piece-jointe.model';

describe('Component Tests', () => {
  describe('PieceJointe Management Detail Component', () => {
    let comp: PieceJointeDetailComponent;
    let fixture: ComponentFixture<PieceJointeDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ pieceJointe: new PieceJointe(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [PieceJointeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PieceJointeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PieceJointeDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load pieceJointe on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pieceJointe).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
