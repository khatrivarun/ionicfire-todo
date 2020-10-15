import { Observable } from 'rxjs';
import { TodoService } from './../../services/todos/todo.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {
  todos: Observable<Todo[]>;

  constructor(private readonly todosService: TodoService) {}

  ngOnInit() {
    this.todos = this.todosService.userTodos;
  }
}
