import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISite, Site } from 'app/shared/model/clientService/site.model';
import { SiteService } from './site.service';

@Component({
  selector: 'jhi-site-update',
  templateUrl: './site-update.component.html',
})
export class SiteUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    designation: [],
    ville: [null, [Validators.required]],
    gpsX: [],
    gpsY: [],
  });

  constructor(protected siteService: SiteService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ site }) => {
      this.updateForm(site);
    });
  }

  updateForm(site: ISite): void {
    this.editForm.patchValue({
      id: site.id,
      code: site.code,
      designation: site.designation,
      ville: site.ville,
      gpsX: site.gpsX,
      gpsY: site.gpsY,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const site = this.createFromForm();
    if (site.id !== undefined) {
      this.subscribeToSaveResponse(this.siteService.update(site));
    } else {
      this.subscribeToSaveResponse(this.siteService.create(site));
    }
  }

  private createFromForm(): ISite {
    return {
      ...new Site(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      designation: this.editForm.get(['designation'])!.value,
      ville: this.editForm.get(['ville'])!.value,
      gpsX: this.editForm.get(['gpsX'])!.value,
      gpsY: this.editForm.get(['gpsY'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISite>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
