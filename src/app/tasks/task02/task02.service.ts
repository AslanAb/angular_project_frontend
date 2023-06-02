import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

export interface IStore {
  randomNumbers: number[]
}

@Injectable()
export class Task02Service {

  private _store: BehaviorSubject<IStore> = new BehaviorSubject<IStore>({
    randomNumbers: []
  });

  public numbers$$: Observable<number[]> = this._store.pipe(
    map((store) => store.randomNumbers),
    distinctUntilChanged()
  );

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

  public addRandomNumber(): void {
    // Исходим из вопроса, что нам надо обновить массив внутри стора
    // Для этого нам нужно 1) прочитать данные из стора
    // 2) Добавить элемент в конец массива
    // 3) Перезаписать данные в сторе.
    // Но у нас есть одно условие, нам нужна копия массива. Поэтому мы на шаге 1
    // после прочтения данных из стора отклонируем массив
    // ниже максимально  решение:

    // 1. Прочитаем данные из стора
    const randomNumbersInStore: number[] = this._store.getValue().randomNumbers;
    // создадим копию массива. Если мы не знаем как это сделать коротко, делаем  циклом
    const copyOfNumbers: number[] = [];
    randomNumbersInStore.forEach(num => copyOfNumbers.push(num)); // просто в цикле копируем массив в новый
    // добавляем новый элемент в конец массива-копии
    copyOfNumbers.push(this._getRandomNumber());
    // записываем новые значения в стор
    this._updateStore({ randomNumbers: copyOfNumbers });

    // ниже более короткий способ того же самого, что у нас написано выше, просто используя всякий синтаксический
    // сахар, который есть в джаваскрипте
    if ('1'.toString() === '2') { // это просто чтобы этот код не выполнялся
      // тут создается копия массива и добавляется новый элемент в конец
      const updatedArray = [...this._store.getValue().randomNumbers, this._getRandomNumber()];
      // обновляем стор новым массивом
      this._updateStore({ randomNumbers: updatedArray });
    }

  }

  private _getRandomNumber(max: number = 100): number {
    return Math.floor(Math.random() * max);
  }

  private _updateStore(data: Partial<IStore>): void {
    this._store.next({ ...this._store.getValue(), ...data });
  }

}
