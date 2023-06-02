import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Task04Service } from './task04.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-task04',
  templateUrl: './task04.component.html',
  styleUrls: ['./task04.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Task04Service]
})
export class Task04Component {
  public boxes$$: Observable<string[]> = this._store.area$$;
  public move$$:Observable<number> = this._store.move$$;

  constructor(private _store: Task04Service) { }


  markArea(event: Event): void {
  if((event.target as Element).className === 'box'){
    this._store.markAreaInStore();
    console.log('mark');
  }
  }
}
