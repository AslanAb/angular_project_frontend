import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { CounterComponent } from "./counter/counter.component";
import { TodoComponent } from "./todo/todo.component";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { TodoAddComponent } from "./todo/todo-add/todo-add.component";
import { TodoListComponent } from "./todo/todo-list/todo-list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TodoEditComponent } from "./todo/todo-edit/todo-edit.component";
import { TodoListsComponent } from "./todo/todo-lists/todo-lists.component";
import { ModalComponent } from "./todo/modal/modal.component";

@NgModule({
  declarations: [AppComponent, LoginComponent, CounterComponent, TodoComponent, TodoAddComponent, TodoListComponent, TodoEditComponent, TodoListsComponent, ModalComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    NoopAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
