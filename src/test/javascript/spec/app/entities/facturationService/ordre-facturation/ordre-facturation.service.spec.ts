import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { OrdreFacturationService } from 'app/entities/facturationService/ordre-facturation/ordre-facturation.service';
import { IOrdreFacturation, OrdreFacturation } from 'app/shared/model/facturationService/ordre-facturation.model';

describe('Service Tests', () => {
  describe('OrdreFacturation Service', () => {
    let injector: TestBed;
    let service: OrdreFacturationService;
    let httpMock: HttpTestingController;
    let elemDefault: IOrdreFacturation;
    let expectedResult: IOrdreFacturation | IOrdreFacturation[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(OrdreFacturationService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new OrdreFacturation(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 0, currentDate, currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateFacture: currentDate.format(DATE_FORMAT),
            dateEcheance: currentDate.format(DATE_FORMAT),
            dateDecharge: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a OrdreFacturation', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateFacture: currentDate.format(DATE_FORMAT),
            dateEcheance: currentDate.format(DATE_FORMAT),
            dateDecharge: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateFacture: currentDate,
            dateEcheance: currentDate,
            dateDecharge: currentDate,
          },
          returnedFromService
        );

        service.create(new OrdreFacturation()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a OrdreFacturation', () => {
        const returnedFromService = Object.assign(
          {
            devis: 'BBBBBB',
            bonDeCommande: 'BBBBBB',
            numeroFacture: 'BBBBBB',
            montantFacture: 1,
            dateFacture: currentDate.format(DATE_FORMAT),
            dateEcheance: currentDate.format(DATE_FORMAT),
            dateDecharge: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateFacture: currentDate,
            dateEcheance: currentDate,
            dateDecharge: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of OrdreFacturation', () => {
        const returnedFromService = Object.assign(
          {
            devis: 'BBBBBB',
            bonDeCommande: 'BBBBBB',
            numeroFacture: 'BBBBBB',
            montantFacture: 1,
            dateFacture: currentDate.format(DATE_FORMAT),
            dateEcheance: currentDate.format(DATE_FORMAT),
            dateDecharge: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateFacture: currentDate,
            dateEcheance: currentDate,
            dateDecharge: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a OrdreFacturation', () => {
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
