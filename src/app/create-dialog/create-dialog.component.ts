import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../models/category';
import { AddTodo } from '../models/todo';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent {
  categories: Category[] = [];
  todoForm: FormGroup;

  get title() { return this.todoForm.get('title'); }
  get categoryId() { return this.todoForm.get('categoryId'); }
  get body() { return this.todoForm.get('body'); }

  constructor(public dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateDialogNorification) {
    this.todoForm = this.initForm();
    this.categories = data.categories;
  }

  ngOnInit(): void {    
  }

  onExecute(): void {
    const addTodo = this.todoForm.value as AddTodo
    this.dialogRef.close(addTodo);
  }

  onCancel(): void {
    this.dialogRef.close(undefined);
  }

  private initForm(): FormGroup {
    return new FormGroup({
      title: new FormControl("", [Validators.required, Validators.maxLength(64)]),
      categoryId: new FormControl([Validators.required]),
      body: new FormControl("", [Validators.maxLength(256)])
    });
  }
}

export class CreateDialogNorification {
  constructor(public categories: Category[]){}
}