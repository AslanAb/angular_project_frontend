import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ModalService } from "./modal.service";

@Component({
  selector: "app-todo",
  styleUrls: ["./todo.component.scss"],
  templateUrl: "./todo.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  constructor(public modalService: ModalService) {}
}
