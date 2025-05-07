import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { SocieteDetailComponent } from 'app/entities/clientService/societe/societe-detail.component';
import { Societe } from 'app/shared/model/clientService/societe.model';

describe('Component Tests', () => {
  describe('Societe Management Detail Component', () => {
    let comp: SocieteDetailComponent;
    let fixture: ComponentFixture<SocieteDetailComponent>;
    const route = ({ data: of({ societe: new Societe(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [SocieteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SocieteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SocieteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load societe on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.societe).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
