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
  private todo: Todo;
  private todosCollection: AngularFirestoreCollection<Todo>;

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly authService: AuthService
  ) {
    const user = this.authService.loggedInUser;
    if (user) {
      this.uid = user.uid;
      this.todosCollection = this.firestore.collection(
        `todos/${this.uid}/todos`
      );
      this.todos = this.todosCollection.valueChanges({ idField: 'id' });

      this.todo = null;
    }
  }

  fetch() {
    this.uid = this.authService.loggedInUser.uid;
    this.todosCollection = this.firestore.collection(`todos/${this.uid}/todos`);
    this.todos = this.todosCollection.valueChanges({ idField: 'id' });

    this.todo = null;
  }

  selectTodo(selected: Todo): void {
    this.todo = selected;
  }

  clearTodo(): void {
    this.todo = null;
  }

  async addTodo(desc: string): Promise<void> {
    const todo: Todo = {
      id: this.firestore.createId(),
      description: desc,
      user: this.uid,
    };

    await this.todosCollection.doc(todo.id).set(todo);
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

  get selectedTodo(): Todo {
    return this.todo;
  }
}
