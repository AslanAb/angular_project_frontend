import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Task02Service } from './task02.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task02',
  templateUrl: './task02.component.html',
  styleUrls: ['./task02.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Task02Service]
})
export class Task02Component {
  public numbers$$: Observable<number[]> = this.store.numbers$$;
  public countOfNumbers$$: Observable<number> = this.store.countOfNumbers$$;
  public minOfAllNumbers$$:Observable<number> = this.store.minOfAllnumbers$$;
  public maxOfAllNumbers$$:Observable<number> = this.store.maxOfAllNumbers$$;
  public averageNumber$$:Observable<number> = this.store.averageNumber$$;

  constructor(private store: Task02Service) { }

  onClick(): void {
    this.store.addRandomNumber();
  }
}

