import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { WorkOrderService } from 'app/entities/missionService/work-order/work-order.service';
import { IWorkOrder, WorkOrder } from 'app/shared/model/missionService/work-order.model';

describe('Service Tests', () => {
  describe('WorkOrder Service', () => {
    let injector: TestBed;
    let service: WorkOrderService;
    let httpMock: HttpTestingController;
    let elemDefault: IWorkOrder;
    let expectedResult: IWorkOrder | IWorkOrder[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(WorkOrderService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new WorkOrder(
        0,
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        currentDate,
        currentDate,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateHeureDebutPrevisionnel: currentDate.format(DATE_TIME_FORMAT),
            dateHeureFinPrevisionnel: currentDate.format(DATE_TIME_FORMAT),
            dateHeureDebutReel: currentDate.format(DATE_TIME_FORMAT),
            dateHeureFinReel: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a WorkOrder', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateHeureDebutPrevisionnel: currentDate.format(DATE_TIME_FORMAT),
            dateHeureFinPrevisionnel: currentDate.format(DATE_TIME_FORMAT),
            dateHeureDebutReel: currentDate.format(DATE_TIME_FORMAT),
            dateHeureFinReel: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateHeureDebutPrevisionnel: currentDate,
            dateHeureFinPrevisionnel: currentDate,
            dateHeureDebutReel: currentDate,
            dateHeureFinReel: currentDate,
          },
          returnedFromService
        );

        service.create(new WorkOrder()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a WorkOrder', () => {
        const returnedFromService = Object.assign(
          {
            demandeur: 'BBBBBB',
            motif: 'BBBBBB',
            dateHeureDebutPrevisionnel: currentDate.format(DATE_TIME_FORMAT),
            dateHeureFinPrevisionnel: currentDate.format(DATE_TIME_FORMAT),
            dateHeureDebutReel: currentDate.format(DATE_TIME_FORMAT),
            dateHeureFinReel: currentDate.format(DATE_TIME_FORMAT),
            materielUtilise: 'BBBBBB',
            remarque: 'BBBBBB',
            numeroFicheIntervention: 'BBBBBB',
            hebergement: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateHeureDebutPrevisionnel: currentDate,
            dateHeureFinPrevisionnel: currentDate,
            dateHeureDebutReel: currentDate,
            dateHeureFinReel: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of WorkOrder', () => {
        const returnedFromService = Object.assign(
          {
            demandeur: 'BBBBBB',
            motif: 'BBBBBB',
            dateHeureDebutPrevisionnel: currentDate.format(DATE_TIME_FORMAT),
            dateHeureFinPrevisionnel: currentDate.format(DATE_TIME_FORMAT),
            dateHeureDebutReel: currentDate.format(DATE_TIME_FORMAT),
            dateHeureFinReel: currentDate.format(DATE_TIME_FORMAT),
            materielUtilise: 'BBBBBB',
            remarque: 'BBBBBB',
            numeroFicheIntervention: 'BBBBBB',
            hebergement: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateHeureDebutPrevisionnel: currentDate,
            dateHeureFinPrevisionnel: currentDate,
            dateHeureDebutReel: currentDate,
            dateHeureFinReel: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a WorkOrder', () => {
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
