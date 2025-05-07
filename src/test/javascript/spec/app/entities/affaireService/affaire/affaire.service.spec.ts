import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { AffaireService } from 'app/entities/affaireService/affaire/affaire.service';
import { IAffaire, Affaire } from 'app/shared/model/affaireService/affaire.model';
import { StatutAffaire } from 'app/shared/model/enumerations/statut-affaire.model';

describe('Service Tests', () => {
  describe('Affaire Service', () => {
    let injector: TestBed;
    let service: AffaireService;
    let httpMock: HttpTestingController;
    let elemDefault: IAffaire;
    let expectedResult: IAffaire | IAffaire[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AffaireService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Affaire(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        currentDate,
        currentDate,
        currentDate,
        false,
        0,
        0,
        0,
        StatutAffaire.DRAFT
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateDebut: currentDate.format(DATE_FORMAT),
            dateCloture: currentDate.format(DATE_FORMAT),
            datePassageExecution: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Affaire', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateDebut: currentDate.format(DATE_FORMAT),
            dateCloture: currentDate.format(DATE_FORMAT),
            datePassageExecution: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDebut: currentDate,
            dateCloture: currentDate,
            datePassageExecution: currentDate,
          },
          returnedFromService
        );

        service.create(new Affaire()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Affaire', () => {
        const returnedFromService = Object.assign(
          {
            numeroAffaire: 'BBBBBB',
            designationAffaire: 'BBBBBB',
            bonDeCommande: 'BBBBBB',
            montant: 1,
            devise: 'BBBBBB',
            dateDebut: currentDate.format(DATE_FORMAT),
            dateCloture: currentDate.format(DATE_FORMAT),
            datePassageExecution: currentDate.format(DATE_FORMAT),
            lieuMultipleParMission: true,
            montantVente: 1,
            montantBudgetaireMateriel: 1,
            montantBudgetaireService: 1,
            statut: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDebut: currentDate,
            dateCloture: currentDate,
            datePassageExecution: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Affaire', () => {
        const returnedFromService = Object.assign(
          {
            numeroAffaire: 'BBBBBB',
            designationAffaire: 'BBBBBB',
            bonDeCommande: 'BBBBBB',
            montant: 1,
            devise: 'BBBBBB',
            dateDebut: currentDate.format(DATE_FORMAT),
            dateCloture: currentDate.format(DATE_FORMAT),
            datePassageExecution: currentDate.format(DATE_FORMAT),
            lieuMultipleParMission: true,
            montantVente: 1,
            montantBudgetaireMateriel: 1,
            montantBudgetaireService: 1,
            statut: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDebut: currentDate,
            dateCloture: currentDate,
            datePassageExecution: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Affaire', () => {
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
