import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { AffaireDetailComponent } from 'app/entities/affaireService/affaire/affaire-detail.component';
import { Affaire } from 'app/shared/model/affaireService/affaire.model';

describe('Component Tests', () => {
  describe('Affaire Management Detail Component', () => {
    let comp: AffaireDetailComponent;
    let fixture: ComponentFixture<AffaireDetailComponent>;
    const route = ({ data: of({ affaire: new Affaire(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [AffaireDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AffaireDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AffaireDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load affaire on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.affaire).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
