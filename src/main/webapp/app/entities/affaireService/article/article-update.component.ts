import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IArticle, Article } from 'app/shared/model/affaireService/article.model';
import { ArticleService } from './article.service';

@Component({
  selector: 'jhi-article-update',
  templateUrl: './article-update.component.html',
})
export class ArticleUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    designation: [null, [Validators.required]],
    uniteDeMessure: [null, [Validators.required]],
    quantiteContractuelle: [],
    quantiteRealisee: [],
  });

  constructor(protected articleService: ArticleService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ article }) => {
      this.updateForm(article);
    });
  }

  updateForm(article: IArticle): void {
    this.editForm.patchValue({
      id: article.id,
      code: article.code,
      designation: article.designation,
      uniteDeMessure: article.uniteDeMessure,
      quantiteContractuelle: article.quantiteContractuelle,
      quantiteRealisee: article.quantiteRealisee,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const article = this.createFromForm();
    if (article.id !== undefined) {
      this.subscribeToSaveResponse(this.articleService.update(article));
    } else {
      this.subscribeToSaveResponse(this.articleService.create(article));
    }
  }

  private createFromForm(): IArticle {
    return {
      ...new Article(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      designation: this.editForm.get(['designation'])!.value,
      uniteDeMessure: this.editForm.get(['uniteDeMessure'])!.value,
      quantiteContractuelle: this.editForm.get(['quantiteContractuelle'])!.value,
      quantiteRealisee: this.editForm.get(['quantiteRealisee'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArticle>>): void {
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
