import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  // MatPaginator Output
  pageEvent$: BehaviorSubject<PageEvent> = new BehaviorSubject<PageEvent>({ pageIndex: 0, length: 0, pageSize: this.pageSize, previousPageIndex: 0});
  // @ViewChild(MatSort) sort: MatSort | null = null;
  iconMetdata: IconMetadata = iconMetdata;
  filterInput: FormControl = new FormControl('');
  filteredIcons: Observable<IconElement[]> | null = null;
  filteredIconslength: number = 0;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    if (this.sortBy === 'popularity') {
      this.iconMetdata.icons = this.iconMetdata.icons.sort((a, b) => b.popularity - a.popularity);
    } else if (this.sortBy === 'name') {
      this.iconMetdata.icons = this.iconMetdata.icons.sort();
    } else if (this.sortBy === 'version') {
      this.iconMetdata.icons = this.iconMetdata.icons.sort((a, b) => b.version - a.version);
    }

    this.filteredIcons = merge(...[
      this.filterInput.valueChanges.pipe(startWith(''), tap(() => this.paginator?.firstPage())),
      this.pageEvent$.asObservable()
    ]).pipe(
      map(([value, page]) => {
        const lower = this.filterInput.value.toLowerCase();
        return this.iconMetdata.icons.filter((icon: IconElement) => {
          let match = false;
          match = icon.name.toLowerCase().includes(lower);
          if (!match && icon.tags.length) {
            return icon.tags.reduce((acc, tag) => tag.toLowerCase().includes(lower), new Boolean(false));
          }
          return match;
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
