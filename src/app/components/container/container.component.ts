import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModal } from 'src/app/confirm-dialog/confirm-dialog.component';
import { CreateDialogComponent, CreateDialogNorification } from 'src/app/create-dialog/create-dialog.component';
import { Category } from 'src/app/models/category';
import { EditedTodo, Todo } from 'src/app/models/todo';
import { CategoryService } from 'src/app/services/category.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {
  categories!: Category[];
  selectedCategories!: Category[];
  displayTodos: Todo[] = [];
  selectedTodo?: Todo;
  private todos: Todo[] = [];

  constructor(
    public dialog: MatDialog,
    private todoService: TodoService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getTodos();
  }

  getCategories(): void {
    this.categoryService
      .getCategories()
      .subscribe(categories => this.categories = categories)
  }

  getTodos(): void {
    this.selectedTodo = undefined;
    this.todoService
      .getTodos()
      .subscribe(todos => this.displayTodos = this.todos = todos);
  }

  addTodo(): void {
    const notificateion = new CreateDialogNorification(this.categories);

    const dialogRef = this.dialog.open(CreateDialogComponent, {
      data: notificateion
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (!dialogResult) {
        return;
      }
      this.todoService.addTodo(dialogResult).subscribe(() => this.getTodos())
    });
  }

  updateTodo(edited: EditedTodo): void {
    if (!this.selectedTodo) {
      return;
    }

    this.todoService
      .updateTodo(this.selectedTodo.id, edited)
      .subscribe(() => this.getTodos());
  }

  deleteTodo(todo: Todo): void {
    const notice = new ConfirmDialogModal('Todoの削除', `${todo.title}を削除します。`);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "600px",
      data: notice
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.todoService.deleteTodo(todo.id).subscribe(() => this.getTodos());
      }
    });
  }

  filterdTodoByCategory(): Todo[] {
    return this.todos.filter(todo => this.selectedCategories?.map(category => category.id).includes(todo.categoryId))
  }

  onSelectCategories(selectedCategories: Category[]): void {
    this.selectedTodo = undefined;
    this.selectedCategories = selectedCategories;
    this.displayTodos = this.filterdTodoByCategory();
  }

  onSelectTodo(selectedTodo: Todo): void {
    this.selectedTodo = selectedTodo;
  }
}