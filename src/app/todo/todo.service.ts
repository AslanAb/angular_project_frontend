import { Injectable } from "@angular/core";
import { ITodo, ITodoRequest } from "./todo.model";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ITodoUpdateRequest } from "./todo.model";

export interface ITodoStorageItem {
  id: string;
  text: string;
  isDone: boolean;
  createdOn: string;
  selected: boolean;
}

@Injectable({ providedIn: "root" })
export class TodoService {
  private _todos$: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>([]);
  readonly todos$: Observable<ITodo[]> = this._todos$.asObservable();
  private exampleTodo = {
    id: "1",
    text: "текст задачи",
    isDone: true,
    createdOn: "2023-05-23T08:04:35.625Z",
    selected: true,
  };
  public selectedTodo$: BehaviorSubject<ITodo> = new BehaviorSubject<ITodo>(this.exampleTodo);
  constructor(private http: HttpClient) {}

  createTodo(todo: ITodoRequest): Observable<void> {
    return this.http.post<ITodoStorageItem>("http://localhost:3000/add", todo).pipe(
      tap(() => this.uploadAllTodos().subscribe()),
      map(() => void 0)
    );
  }

  uploadAllTodos(): Observable<void> {
    return this.http.get<ITodoStorageItem[]>("http://localhost:3000/todos").pipe(
      tap((todos) => this._todos$.next(todos)),
      map(() => void 0)
    );
  }

  deleteTodoById(id: string): Observable<void> {
    return this.http.delete<void>("http://localhost:3000/delete/" + id).pipe(
      tap(() => this.uploadAllTodos().subscribe()),
      map(() => void 0)
    );
  }

  selectTodo(id: string): void {
    this._todos$.getValue().forEach((el: ITodo) => (el.selected = false));
    const selectedTodo: ITodo | undefined = this._todos$.getValue().find((el: ITodo) => el.id === id);
    if (selectedTodo == undefined) {
      return;
    }
    selectedTodo.selected = true;
    const oldArrOfTodos: ITodo[] = this._todos$.getValue();
    const newArrOfTodos: ITodo[] = [];
    oldArrOfTodos.forEach((todo: ITodo) => newArrOfTodos.push(todo));
    this._todos$.next(newArrOfTodos);
    this.selectedTodo$.next(selectedTodo);
  }
  updateTodo(todo: ITodoUpdateRequest): Observable<void> {
    return this.http.post<ITodoStorageItem>("http://localhost:3000/update", todo).pipe(
      tap(() => this.uploadAllTodos().subscribe()),
      map(() => void 0)
    );
  }
}
