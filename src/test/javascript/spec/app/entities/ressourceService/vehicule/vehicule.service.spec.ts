import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { VehiculeService } from 'app/entities/ressourceService/vehicule/vehicule.service';
import { IVehicule, Vehicule } from 'app/shared/model/ressourceService/vehicule.model';
import { TypeCarburant } from 'app/shared/model/enumerations/type-carburant.model';

describe('Service Tests', () => {
  describe('Vehicule Service', () => {
    let injector: TestBed;
    let service: VehiculeService;
    let httpMock: HttpTestingController;
    let elemDefault: IVehicule;
    let expectedResult: IVehicule | IVehicule[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(VehiculeService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Vehicule(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 0, 'AAAAAAA', currentDate, TypeCarburant.ESSENCE);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateCirculation: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Vehicule', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateCirculation: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateCirculation: currentDate,
          },
          returnedFromService
        );

        service.create(new Vehicule()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Vehicule', () => {
        const returnedFromService = Object.assign(
          {
            marque: 'BBBBBB',
            type: 'BBBBBB',
            matricule: 'BBBBBB',
            nbPlaces: 1,
            numeroCarteGrise: 'BBBBBB',
            dateCirculation: currentDate.format(DATE_FORMAT),
            typeCarburant: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateCirculation: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Vehicule', () => {
        const returnedFromService = Object.assign(
          {
            marque: 'BBBBBB',
            type: 'BBBBBB',
            matricule: 'BBBBBB',
            nbPlaces: 1,
            numeroCarteGrise: 'BBBBBB',
            dateCirculation: currentDate.format(DATE_FORMAT),
            typeCarburant: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateCirculation: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Vehicule', () => {
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
