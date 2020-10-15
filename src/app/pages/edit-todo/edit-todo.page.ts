import { Todo } from './../../models/todo.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todos/todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.page.html',
  styleUrls: ['./edit-todo.page.scss'],
})
export class EditTodoPage implements OnInit {
  editTodoForm: FormGroup;
  isSubmitted: boolean;
  todo: Todo;

  constructor(
    private readonly todoService: TodoService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.todo = this.todoService.selectedTodo;

    this.editTodoForm = this.formBuilder.group({
      description: [this.todo.description, Validators.required],
    });

    this.isSubmitted = false;
  }

  get errorControls() {
    return this.editTodoForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.editTodoForm.valid) {
      this.todo.description = this.editTodoForm.value.description;
      this.todoService.updateTodo(this.todo).then((_) => {
        this.router.navigate(['todos']);
      });
    }
  }
}
