import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface IStore {
  area: string[],
  move: number
}


@Injectable()
export class Task04Service {


  private _store: BehaviorSubject<IStore> = new BehaviorSubject<IStore>({
    area: [],
    move: 0
  });

  constructor() {}

  area$$:Observable<string[]> = this._store.pipe(
    map((store) => store.area)
  )

  move$$:Observable<number> = this._store.pipe(
    map((store) => store.move)
  )

  public markAreaInStore():void {
    const areaInStore: string[] = this._store.getValue().area;
    const copyOfAreas: string[] = [];
    areaInStore.forEach(item => copyOfAreas.push(item));
    copyOfAreas.push('X');
    this._updateStore({ area: copyOfAreas });
  }

  private _updateStore(data: Partial<IStore>): void {
    this._store.next({ ...this._store.getValue(), ...data });
  }
}


