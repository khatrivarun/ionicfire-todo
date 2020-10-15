import { Router } from '@angular/router';
import { User } from './../../models/user.model';
import { AuthService } from './../../services/auth/auth.service';
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
  user: User;

  constructor(
    private readonly todosService: TodoService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.todos = this.todosService.userTodos;
    this.user = this.authService.loggedInUser;
  }

  onLogOut() {
    this.authService.signOut();
  }

  onSelect(todo: Todo) {
    this.todosService.selectTodo(todo);
    this.router.navigateByUrl('/todos/todo');
  }
}
