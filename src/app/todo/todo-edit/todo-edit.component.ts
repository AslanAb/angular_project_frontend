import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TodoService } from "../todo.service";
import { Observable, map } from "rxjs";
import { ITodo, ITodoUpdateRequest } from "../todo.model";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-edit-todo",
  templateUrl: "todo-edit.component.html",
  styleUrls: ["todo-edit.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoEditComponent {
  todoSaveForm: FormGroup;
  private selectedTodo$$: Observable<ITodo> = this.todoService.selectedTodo$;
  public todoId$$: Observable<string> = this.selectedTodo$$.pipe(map((el: ITodo) => el.id));
  public todoText$$: Observable<string> = this.selectedTodo$$.pipe(map((el: ITodo) => el.text));
  private id$: string = "";
  private isDone$: boolean = false;

  constructor(private todoService: TodoService, private formBuilder: FormBuilder) {
    this.todoSaveForm = this.formBuilder.group({
      text: ["", [Validators.required, Validators.minLength(10)]],
    });
  }
  onSaveSubmit(): void {
    this.selectedTodo$$.subscribe((el) => {
      this.id$ = el.id;
      this.isDone$ = el.isDone;
    });
    const formData: ITodoUpdateRequest = {
      id: this.id$,
      text: this.todoSaveForm.get("text")?.value,
      isDone: this.isDone$,
    };
    this.todoService.updateTodo(formData).subscribe();
    this.todoSaveForm.reset();
  }
  get text() {
    return this.todoSaveForm.controls.text as FormControl;
  }
}
