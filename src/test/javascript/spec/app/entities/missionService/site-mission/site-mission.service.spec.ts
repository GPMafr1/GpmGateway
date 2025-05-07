import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { SiteMissionService } from 'app/entities/missionService/site-mission/site-mission.service';
import { ISiteMission, SiteMission } from 'app/shared/model/missionService/site-mission.model';

describe('Service Tests', () => {
  describe('SiteMission Service', () => {
    let injector: TestBed;
    let service: SiteMissionService;
    let httpMock: HttpTestingController;
    let elemDefault: ISiteMission;
    let expectedResult: ISiteMission | ISiteMission[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(SiteMissionService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new SiteMission(0, 'AAAAAAA', 'AAAAAAA', currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
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

      it('should create a SiteMission', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateHeureDebutReel: currentDate.format(DATE_TIME_FORMAT),
            dateHeureFinReel: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateHeureDebutReel: currentDate,
            dateHeureFinReel: currentDate,
          },
          returnedFromService
        );

        service.create(new SiteMission()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a SiteMission', () => {
        const returnedFromService = Object.assign(
          {
            code: 'BBBBBB',
            commentaire: 'BBBBBB',
            dateHeureDebutReel: currentDate.format(DATE_TIME_FORMAT),
            dateHeureFinReel: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
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

      it('should return a list of SiteMission', () => {
        const returnedFromService = Object.assign(
          {
            code: 'BBBBBB',
            commentaire: 'BBBBBB',
            dateHeureDebutReel: currentDate.format(DATE_TIME_FORMAT),
            dateHeureFinReel: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
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

      it('should delete a SiteMission', () => {
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
