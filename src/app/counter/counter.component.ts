import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CounterStoreService } from './counter.store.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CounterStoreService]
})
export class CounterComponent {
  counter$$: Observable<number> = this._storeService.counter$$;
  isCounterColor$$: Observable<'white' | 'red'> = this._storeService.counter$$.pipe(
    map((counter) => counter >= 5 ? 'red' : 'white')
  );

  incClicks$$: Observable<number> = this._storeService.incClicks$$;
  decClicks$$: Observable<number> = this._storeService.decClicks$$;


  constructor(private _storeService: CounterStoreService) {}

  onDecrementClick(): void {
    this._storeService.decrementOnClient();
  }

  onIncrementClick(): void {
    this._storeService.incrementOnClient();
  }


}
