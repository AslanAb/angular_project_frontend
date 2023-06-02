import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, finalize, map, Observable, switchMap, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface ILoginStore {
  numberArray: number[],
  /**
   * Идет процесс http запроса на логинку
   */
  isLoggingIn: boolean
}

@Injectable()
export class LoginStore {
  private _store: BehaviorSubject<ILoginStore> = new BehaviorSubject<ILoginStore>({
    numberArray: [],
    isLoggingIn: false,
  });

  /**
   * user entered data
   */
  loginCode$$: Observable<string> = this._store.pipe(
    map((store) => store.numberArray),
    map((arr) => arr.join('')),
    distinctUntilChanged()
  );

  isLoginButtonDisabled$$: Observable<boolean> = this._store.pipe(
    map((store) => store.numberArray.length < 4 || store.isLoggingIn)
  );

  // дизаблим ту кпопку которая нажата
  isButtonDisabled$$: Observable<boolean> = this._store.pipe(
   map((store) => store.numberArray.includes(store.numberArray.length))
  );


  isLoggingIn$$: Observable<boolean> = this._store.pipe(map((store) => store.isLoggingIn));

  constructor(private _http: HttpClient) {}

  addDigit(num: number): void {
    const currentValue = this._store.getValue();
    if (currentValue.numberArray.length >= 5) {
      return;
    }
    // crate new array for change detection
    currentValue.numberArray = [...currentValue.numberArray, num];
    this._store.next(currentValue);
  }

  removeLastDigit(): void {
    const currValue = this._store.getValue();
    if (currValue.numberArray.length === 0) {
      return;
    }
    currValue.numberArray.pop();
    currValue.numberArray = [...currValue.numberArray];
    this._store.next(currValue);
  }


  isNumberInArray(num: number): boolean {
    if(this._store.getValue().numberArray.includes(num)){
      return true;
    }
    return false;
  }

  isNumberInArray$(num: number): Observable<boolean> {
    return this._store.pipe(
      map(store => store.numberArray.includes(num))
    );
  }

  doLogin(): Observable<boolean> {
    return this.loginCode$$.pipe(
      take(1),
      map((code) => ({ code })),
      tap(() => this._store.next({ ...this._store.getValue(), isLoggingIn: true })),
      switchMap((req) => this._http.post<{ result: 'ok' | 'error' }>('http://localhost:3000/checkCode', req)),
      tap(() => this._store.next({ ...this._store.getValue(), isLoggingIn: false })),
      map((res) => res.result === 'ok')
    );
  }

  doLogin2(): Observable<boolean> {
    let currentStoreValue = this._store.getValue();
    currentStoreValue = { ...currentStoreValue, isLoggingIn: true };
    this._store.next(currentStoreValue);

    const code = this._store.getValue().numberArray.join('');
    const codeResult = { code };
    return this._http.post<{ result: 'ok' | 'error' }>('http://localhost:3000/checkCode', codeResult).pipe(
      map((obj) => {
        if (obj.result === 'ok') {
          return true;
        } else {
          return false;
        }
      }),
      finalize(() => {
        this._store.next({ ...this._store.getValue(), isLoggingIn: false });
      })
    );
  }
}
