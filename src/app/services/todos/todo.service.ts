import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private uid: string;
  private todos: Observable<Todo[]>;
  private todosCollection: AngularFirestoreCollection<Todo>;

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly authService: AuthService
  ) {
    this.uid = this.authService.loggedInUser.uid;
    this.todosCollection = this.firestore.collection(`todos/${this.uid}`);
    this.todos = this.todosCollection.valueChanges({ idField: 'id' });
  }

  async addTodo(todo: Todo): Promise<void> {
    const id = this.firestore.createId();
    todo.id = id;

    await this.todosCollection.doc(id).set(todo);
  }

  async updateTodo(todo: Todo): Promise<void> {
    await this.todosCollection.doc(todo.id).set(todo);
  }

  async deleteTodo(todo: Todo): Promise<void> {
    await this.todosCollection.doc(todo.id).delete();
  }

  get userTodos(): Observable<Todo[]> {
    return this.todos;
  }
}
