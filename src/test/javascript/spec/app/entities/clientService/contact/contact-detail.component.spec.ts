import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GpmGatewayTestModule } from '../../../../test.module';
import { ContactDetailComponent } from 'app/entities/clientService/contact/contact-detail.component';
import { Contact } from 'app/shared/model/clientService/contact.model';

describe('Component Tests', () => {
  describe('Contact Management Detail Component', () => {
    let comp: ContactDetailComponent;
    let fixture: ComponentFixture<ContactDetailComponent>;
    const route = ({ data: of({ contact: new Contact(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GpmGatewayTestModule],
        declarations: [ContactDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ContactDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContactDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load contact on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.contact).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
