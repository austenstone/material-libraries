import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { UntypedFormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
// import { MatSort } from '@angular/material/sort';
import { IconElement, IconMetadata } from './material-icons';
import iconMetdata from './icons.json';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'material-icon-list',
    templateUrl: './material-icon-list.component.html',
    styleUrls: ['./material-icon-list.component.scss'],
    standalone: false
})
export class MaterialIconListComponent implements OnInit, OnChanges {
  @Input() icon = '';
  @Output() iconChange: EventEmitter<string> = new EventEmitter();
  @Input() color: ThemePalette;
  @Input() styleColor: string | null = null;
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() pageSize = 60;
  @Input() pageSizeOptions: number[] = [10, 20, 40, 60];
  @Input() sortBy: 'name' | 'version' | 'popularity' = 'popularity';
  @Input() hidePageSize = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  filteredIcon$: Observable<IconElement[]> | null = null;
  filteredIconslength = 0;
  filterInput: UntypedFormControl = new UntypedFormControl('');
  pageEvent$: BehaviorSubject<PageEvent>;
  refreshEvent$: EventEmitter<any> = new EventEmitter();
  private icons: IconElement[] = iconMetdata.icons;

  constructor() {
    this.pageEvent$ = new BehaviorSubject<PageEvent>({
      length: iconMetdata.icons.length,
      pageSize: this.pageSize, pageIndex: 0,
      previousPageIndex: 0
    });
  }

  ngOnInit(): void {
    this.pageEvent$.next({ ...this.pageEvent$.value, pageSize: this.pageSize });

    this.filteredIcon$ = merge(...[
      this.filterInput.valueChanges.pipe(
        tap(() => this.paginator?.firstPage())
      ),
      this.pageEvent$.asObservable(),
      this.refreshEvent$.asObservable()
    ]).pipe(
      map(() => {
        const lower = this.filterInput.value.toLowerCase();
        return this.icons.filter((icon: IconElement) => {
          if (icon.name.toLowerCase().includes(lower)) {
            return true;
          } else if (icon.tags.length) {
            return icon.tags.reduce((acc, tag) => tag.toLowerCase().includes(lower), Boolean(false));
          }
          return false;
        });
      }),
      tap((icons) => this.filteredIconslength = icons.length),
      map((icons) => {
        const paginator = this.pageEvent$.value;
        const start = paginator.pageIndex * paginator.pageSize;
        const end = start + paginator.pageSize;
        return icons.slice(start, end);
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sortBy && changes.sortBy.currentValue) {
      this.sortIcons();
      this.refreshEvent$.emit(null);
    }
  }

  sortIcons(): void {
    if (this.sortBy === 'popularity') {
      this.icons = this.icons.sort((a, b) => b.popularity - a.popularity);
    } else if (this.sortBy === 'name') {
      this.icons = this.icons.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortBy === 'version') {
      this.icons = this.icons.sort((a, b) => b.version - a.version);
    }
  }

  selectIcon(icon: string): void {
    console.log('Selected icon:', icon);
    this.icon = icon;
    this.iconChange.emit(icon);
  }

}
