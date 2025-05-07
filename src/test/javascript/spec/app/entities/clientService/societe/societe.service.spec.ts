import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SocieteService } from 'app/entities/clientService/societe/societe.service';
import { ISociete, Societe } from 'app/shared/model/clientService/societe.model';

describe('Service Tests', () => {
  describe('Societe Service', () => {
    let injector: TestBed;
    let service: SocieteService;
    let httpMock: HttpTestingController;
    let elemDefault: ISociete;
    let expectedResult: ISociete | ISociete[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(SocieteService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Societe(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Societe', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Societe()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Societe', () => {
        const returnedFromService = Object.assign(
          {
            raisonSociale: 'BBBBBB',
            raisonSocialeAbrege: 'BBBBBB',
            identifiantUnique: 'BBBBBB',
            registreCommerce: 'BBBBBB',
            codeArticle: 'BBBBBB',
            adresse: 'BBBBBB',
            codePostal: 'BBBBBB',
            pays: 'BBBBBB',
            telephone: 'BBBBBB',
            fax: 'BBBBBB',
            email: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Societe', () => {
        const returnedFromService = Object.assign(
          {
            raisonSociale: 'BBBBBB',
            raisonSocialeAbrege: 'BBBBBB',
            identifiantUnique: 'BBBBBB',
            registreCommerce: 'BBBBBB',
            codeArticle: 'BBBBBB',
            adresse: 'BBBBBB',
            codePostal: 'BBBBBB',
            pays: 'BBBBBB',
            telephone: 'BBBBBB',
            fax: 'BBBBBB',
            email: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Societe', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
