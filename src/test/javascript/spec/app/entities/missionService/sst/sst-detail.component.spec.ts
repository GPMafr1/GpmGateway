import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { SSTDetailComponent } from 'app/entities/missionService/sst/sst-detail.component';
import { SST } from 'app/shared/model/missionService/sst.model';

describe('Component Tests', () => {
  describe('SST Management Detail Component', () => {
    let comp: SSTDetailComponent;
    let fixture: ComponentFixture<SSTDetailComponent>;
    const route = ({ data: of({ sST: new SST(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [SSTDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SSTDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SSTDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load sST on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sST).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
