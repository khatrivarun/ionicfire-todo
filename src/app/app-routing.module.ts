import { TodoGuard } from './guards/todo.guard';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'todos',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/todos/todos.module').then((m) => m.TodosPageModule),
      },
      {
        path: 'todo',
        loadChildren: () =>
          import('./pages/todo/todo.module').then((m) => m.TodoPageModule),
        canActivate: [TodoGuard],
      },
      {
        path: 'todo/update',
        loadChildren: () =>
          import('./pages/edit-todo/edit-todo.module').then(
            (m) => m.EditTodoPageModule
          ),
        canActivate: [TodoGuard],
      },
    ],
  },
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./pages/signin/signin.module').then((m) => m.SigninPageModule),
  },
  {
    path: 'add-todo',
    loadChildren: () =>
      import('./pages/add-todo/add-todo.module').then(
        (m) => m.AddTodoPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
