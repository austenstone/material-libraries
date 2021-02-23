import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { map, startWith, tap } from "rxjs/operators";
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
import { IconElement, IconMetadata, iconMetdata } from './material-icons';
@Component({
  selector: 'app-material-icon-list',
  templateUrl: './material-icon-list.component.html',
  styleUrls: ['./material-icon-list.component.scss']
})
export class MaterialIconListComponent implements OnInit {
  @Input() icon: string = '';
  @Output() iconChange: EventEmitter<string> = new EventEmitter();
  @Input() color: ThemePalette;
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() pageSize: number = 60;
  @Input() pageSizeOptions: number[] = [10, 20, 40, 60];
  @Input() sortBy: 'name' | 'version' | 'popularity' = 'popularity'
  @Input() hidePageSize: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  filteredIcon$: Observable<IconElement[]> | null = null;
  filteredIconslength: number = 0;
  filterInput: FormControl = new FormControl('');
  pageEvent$: BehaviorSubject<PageEvent>;
  private icons: IconElement[] = iconMetdata.icons;

  constructor() {
    this.pageEvent$ = new BehaviorSubject<PageEvent>({ length: iconMetdata.icons.length, pageSize: this.pageSize, pageIndex: 0, previousPageIndex: 0 });
  }

  ngOnInit() {
    this.pageEvent$.next({...this.pageEvent$.value, pageSize: this.pageSize});
    if (this.sortBy === 'popularity') {
      this.icons = this.icons.sort((a, b) => b.popularity - a.popularity);
    } else if (this.sortBy === 'name') {
      this.icons = this.icons.sort();
    } else if (this.sortBy === 'version') {
      this.icons = this.icons.sort((a, b) => b.version - a.version);
    }

    this.filteredIcon$ = merge(...[
      this.filterInput.valueChanges.pipe(
        tap(() => this.paginator?.firstPage())
      ),
      this.pageEvent$.asObservable()
    ]).pipe(
      map(() => {
        const lower = this.filterInput.value.toLowerCase();
        return this.icons.filter((icon: IconElement) => {
          if (icon.name.toLowerCase().includes(lower)) {
            return true;
          } else if (icon.tags.length) {
            return icon.tags.reduce((acc, tag) => tag.toLowerCase().includes(lower), new Boolean(false));
          }
          return false;
        });
      }),
      tap((icons) => this.filteredIconslength = icons.length),
      map((icons) => {
        const paginator = this.pageEvent$.value;
        const start = paginator.pageIndex * paginator.pageSize;
        const end = start + paginator.pageSize;
        return icons.slice(start, end)
      })
    );
  }

  selectIcon(icon: string) {
    this.icon = icon;
    this.iconChange.emit(icon)
  }

}
