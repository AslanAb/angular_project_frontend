import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, distinctUntilChanged, map, Observable, tap } from 'rxjs';

interface IStore {
  counter: number,
  incrementClicksCount: number,
  decrementClicksCount: number

}

@Injectable()
export class CounterStoreService {
  private _store: BehaviorSubject<IStore> = new BehaviorSubject<IStore>({
    counter: 0,
    incrementClicksCount: 0,
    decrementClicksCount: 0
  });

  counter2$$: Observable<number> = this._store.pipe(
    map(st => st.counter),
    distinctUntilChanged()
  );
  
  counter$$: Observable<number> = this._store.pipe(
    map(st => st.incrementClicksCount - st.decrementClicksCount),
    distinctUntilChanged()
  );

  incClicks$$: Observable<number> = this._store.pipe(
    map(st => st.incrementClicksCount),
    distinctUntilChanged()
  );

  decClicks$$: Observable<number> = this._store.pipe(
    map(st => st.decrementClicksCount),
    distinctUntilChanged()
  );

  // isRed$$: Observable<boolean> = this._store.pipe(
  //   map(st => st.isRed),
  //   distinctUntilChanged()
  // );

  constructor(private _http: HttpClient) {}

  public getCounterFromServer(): Observable<void> {
    return this._http.get<{ counter: number }>('http://localhost:3000/test').pipe(
      tap((response) => this._updateStore({ counter: response.counter })),
      map(() => void 0)
    );
  }

  public incrementOnServer(): Observable<void> {
    return this._http.post<void>('http://localhost:3000/test/increment', null);
  }

  public decrementOnServer(): Observable<void> {
    return this._http.post<void>('http://localhost:3000/test/decrement', null);
  }

  public incrementOnClient(): void {
    const currentCounter = this._store.getValue().counter + 1;
    const currentClicks = this._store.getValue().incrementClicksCount + 1;
    this._updateStore({ counter: currentCounter, incrementClicksCount: currentClicks });

  }

  public decrementOnClient(): void {
    const currentCounter = this._store.getValue().counter - 1;
    const currentClicks = this._store.getValue().decrementClicksCount + 1;
    this._updateStore({ counter: currentCounter, decrementClicksCount: currentClicks });
  }

  private _updateStore(data: Partial<IStore>): void {
    this._store.next({ ...this._store.getValue(), ...data });
  }

}
