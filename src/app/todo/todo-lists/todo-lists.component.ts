import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { TodoService } from "../todo.service";

@Component({
  selector: "app-todo-lists",
  templateUrl: "./todo_lists.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListsComponent implements OnInit {
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.uploadAllTodos().subscribe();
  }
}
