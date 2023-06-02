import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface IStore {
  randomNumbers: number[],
  isHttpLoading: boolean
}

export interface IRequestResponse {
  result: number
}

@Injectable()
export class Task03Service {


  private _store: BehaviorSubject<IStore> = new BehaviorSubject<IStore>({
    randomNumbers: [],
    isHttpLoading: false
  });

  randomNumbers$$:Observable<number[]> = this._store.pipe(
    map((store) => store.randomNumbers)
  )

  isLoading$$:Observable<boolean> = this._store.pipe(
    map((store) => store.isHttpLoading)
  )

  public countOfNumbers$$: Observable<number> = this._store.pipe(
    map((store) => store.randomNumbers.length),
    distinctUntilChanged()
  );

  public minOfAllnumbers$$: Observable<number> = this._store.pipe(
    map((store) => {
      if (store.randomNumbers.length === 0) {
        return 0;
      }
      return Math.min(...store.randomNumbers);
    }),
    distinctUntilChanged()
  );

  public maxOfAllNumbers$$: Observable<number> = this._store.pipe(
    map((store) => {
      if(store.randomNumbers.length === 0){
        return 0;
      }
      return Math.max(...store.randomNumbers);
    }),
    distinctUntilChanged()
  );

  public averageNumber$$: Observable<number> = this._store.pipe(
    map((store) => {
      if(store.randomNumbers.length === 0){
        return 0;
      }
      return store.randomNumbers.reduce((acc, curr) => acc + curr, 0) / store.randomNumbers.length;
    }),
    distinctUntilChanged()
  );

  constructor(private http: HttpClient) {
  }

  getRandomNumberFromServer(): Observable<void> {
    return of(0).pipe(
      tap(() => this._updateStore({ isHttpLoading: true })),
      switchMap(() => this.http.get<{result: number}>('http://localhost:3000/randomNumber')),
      map((object) => object.result),
      tap((number) => {
        const oldRandomNumbers = this._store.getValue().randomNumbers;
        this._updateStore({ randomNumbers: [...oldRandomNumbers, number], isHttpLoading: false })
      }),
     //  tap((number) => {
     //   const randomNumbersInStore: number[] = this._store.getValue().randomNumbers;
     //   const copyOfNumbers: number[] = [];
     //   randomNumbersInStore.forEach(num => copyOfNumbers.push(num));
     //   copyOfNumbers.push(number);
     //   this._updateStore({ randomNumbers: copyOfNumbers, isHttpLoading: false })
     // }),
      map(() => void 0)
    )
  }

  private _updateStore(data: Partial<IStore>): void {
    this._store.next({ ...this._store.getValue(), ...data });
  }


}
