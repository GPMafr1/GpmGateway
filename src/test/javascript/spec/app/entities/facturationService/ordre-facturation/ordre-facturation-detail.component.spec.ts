import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { OrdreFacturationDetailComponent } from 'app/entities/facturationService/ordre-facturation/ordre-facturation-detail.component';
import { OrdreFacturation } from 'app/shared/model/facturationService/ordre-facturation.model';

describe('Component Tests', () => {
  describe('OrdreFacturation Management Detail Component', () => {
    let comp: OrdreFacturationDetailComponent;
    let fixture: ComponentFixture<OrdreFacturationDetailComponent>;
    const route = ({ data: of({ ordreFacturation: new OrdreFacturation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [OrdreFacturationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(OrdreFacturationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrdreFacturationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ordreFacturation on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ordreFacturation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
