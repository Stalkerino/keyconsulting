import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FilterType } from '../../models/filter-type.model';

@Component({
  selector: 'app-filters',
  imports: [CommonModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {

  @Output() filterChange = new EventEmitter<FilterType>();
  @Output() searchTextChange = new EventEmitter<string>();

  currentFilter: FilterType = 'ALL';
  
  setFilter(filter: FilterType) {
    this.filterChange.emit(filter);
    this.currentFilter = filter;
  }

  updateSearchText(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTextChange.emit(inputElement.value);
  }

}