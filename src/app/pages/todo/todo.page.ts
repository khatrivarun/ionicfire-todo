import { Router } from '@angular/router';
import { Todo } from './../../models/todo.model';
import { TodoService } from './../../services/todos/todo.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit, OnDestroy {
  todo: Todo;

  constructor(
    private readonly todoService: TodoService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.todo = this.todoService.selectedTodo;
  }

  ngOnDestroy() {
    this.todoService.clearTodo();
  }

  onDelete() {
    this.todoService.deleteTodo(this.todo).then((_) => {
      this.router.navigateByUrl('/todos');
    });
  }
}
