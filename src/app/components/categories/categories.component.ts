import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  @Input() categories: Category[] = [];

  @Output() selectedItemEvent = new EventEmitter<Category[]>();

  selectableItems: [Category, boolean][] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {    
    const categories = changes["categories"];
    if (categories.firstChange) {
      return;
    }
    this.categories
      .forEach(category => 
        this.selectableItems.push([category, true])
      )
    
    this.selectedItemEvent.emit(this.selectedCategories())
  }

  selectedCategories(): Category[] {
    return this.selectableItems
      .filter(item => 
        item[1]
      ).map(item =>
        item[0]
      )
  } 

  onSelect(e: any) {
    this.selectedItemEvent.emit(this.selectedCategories())
  }
}
