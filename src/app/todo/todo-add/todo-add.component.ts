import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TodoService } from "../todo.service";
import { ITodoRequest } from "../todo.model";

@Component({
  selector: "app-todo-add",
  templateUrl: "todo-add.component.html",
  styleUrls: ["todo-add.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoAddComponent {
  todoForm: FormGroup;

  constructor(private todoService: TodoService, private formBuilder: FormBuilder) {
    this.todoForm = this.formBuilder.group({
      value: ["", Validators.required],
      checkbox: [false, Validators.required],
    });
  }

  onSubmit(): void {
    const formData: ITodoRequest = {
      text: this.todoForm.get("value")?.value,
      isDone: this.todoForm.get("checkbox")?.value,
    };
    this.todoService.createTodo(formData).subscribe();
    this.todoForm.reset();
  }
}
