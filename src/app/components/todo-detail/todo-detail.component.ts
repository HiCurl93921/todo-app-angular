import { Component, EventEmitter, Input, NgModule, Output, SimpleChanges } from '@angular/core';
import { EditedTodo, Todo } from '../../models/todo';
import { AllStates, State } from 'src/app/models/state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
})
export class TodoDetailComponent {
  @Input() todo?: Todo;
  @Input() categories!: Category[];

  @Output() saveEvent = new EventEmitter<EditedTodo>();

  todoForm: FormGroup;
  get title() { return this.todoForm.get('title'); }
  get body() { return this.todoForm.get('body'); }

  states: State[] = AllStates;

  constructor() {
    this.todoForm = this.initForm(this.todo);
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      if (prop === 'todo') {
        const todo = changes[prop].currentValue;
        this.todoForm = this.initForm(todo);
      }
    }
  }

  ngOnInit(): void {
  }

  onSaveButtonClick(): void {
    const edited = this.todoForm.value as EditedTodo;
    this.saveEvent.emit(edited);
  }

  private initForm(todo?: Todo): FormGroup {
    return new FormGroup({
      title: new FormControl(todo?.title || "", [Validators.required, Validators.maxLength(64)]),
      categoryId: new FormControl(todo?.categoryId || 0),
      body: new FormControl(todo?.body || "", [Validators.maxLength(256)]),
      state: new FormControl(todo?.state?.code || 0)
    });
  }
}