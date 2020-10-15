import { TodoService } from './../services/todos/todo.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TodoGuard implements CanActivate {
  constructor(
    private readonly todoService: TodoService,
    private readonly router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise((resolve, _) => {
      const todo = this.todoService.selectedTodo;

      if (todo) {
        resolve(true);
      } else {
        this.router.navigateByUrl('todos');
        resolve(false);
      }
    });
  }
}
