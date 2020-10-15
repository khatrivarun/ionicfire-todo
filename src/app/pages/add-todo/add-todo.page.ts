import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from './../../services/todos/todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.page.html',
  styleUrls: ['./add-todo.page.scss'],
})
export class AddTodoPage implements OnInit {
  addTodoForm: FormGroup;
  isSubmitted: boolean;

  constructor(
    private readonly todoService: TodoService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.addTodoForm = this.formBuilder.group({
      description: ['', Validators.required],
    });

    this.isSubmitted = false;
  }

  get errorControls() {
    return this.addTodoForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.addTodoForm.valid) {
      const description = this.addTodoForm.value.description;
      this.todoService.addTodo(description).then((_) => {
        this.router.navigate(['todos']);
      });
    }
  }
}
