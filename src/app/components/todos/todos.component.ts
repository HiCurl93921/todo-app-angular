import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

import { Todo } from '../../models/todo';
import { Category } from '../../models/category';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
  @Input() categories!: Category[];
  @Input() todos!: Todo[];
  @Output() addEvent = new EventEmitter();
  @Output() selectedTodoEvent = new EventEmitter<Todo>(); 
  @Output() deleteEvent = new EventEmitter<Todo>();
  selectedTodo?: Todo;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      if (prop === 'todos') {
        this.selectedTodo = undefined;
      }
    }
  }

  ngOnInit(): void {
  }

  onAdd(): void {
    this.addEvent.emit();
  }

  onSelect(todo: Todo): void {
    this.selectedTodo = todo;
    this.selectedTodoEvent.emit(todo);
  }

  filterdTodoByCategory(category: Category): Todo[] {
    return this.todos.filter(todo => todo.categoryId === category.id)
  }

  onDelete(todo: Todo): void {
    this.deleteEvent.emit(todo);
  }
}