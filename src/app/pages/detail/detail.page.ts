import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'detail-page',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailPage {
  data$?: Observable<string>;

  constructor(private _activatedRoute: ActivatedRoute) {
    this.data$ = this._activatedRoute.params.pipe(map((params: Params) => params['data']));
  }
}
