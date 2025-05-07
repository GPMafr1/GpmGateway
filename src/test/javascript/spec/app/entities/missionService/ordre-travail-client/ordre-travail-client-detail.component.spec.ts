import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { OrdreTravailClientDetailComponent } from 'app/entities/missionService/ordre-travail-client/ordre-travail-client-detail.component';
import { OrdreTravailClient } from 'app/shared/model/missionService/ordre-travail-client.model';

describe('Component Tests', () => {
  describe('OrdreTravailClient Management Detail Component', () => {
    let comp: OrdreTravailClientDetailComponent;
    let fixture: ComponentFixture<OrdreTravailClientDetailComponent>;
    const route = ({ data: of({ ordreTravailClient: new OrdreTravailClient(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [OrdreTravailClientDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(OrdreTravailClientDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrdreTravailClientDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ordreTravailClient on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ordreTravailClient).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
