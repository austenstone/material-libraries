import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
import { merge, Observable } from 'rxjs';
import { IconElement, IconMetadata, iconMetdata } from '../material-icons';
import { map, startWith, tap } from "rxjs/operators";
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-material-icon-list',
  templateUrl: './material-icon-list.component.html',
  styleUrls: ['./material-icon-list.component.scss']
})
export class MaterialIconListComponent implements OnInit, AfterViewInit {
  @Input() icon: string = '';
  @Output() iconChange: EventEmitter<string> = new EventEmitter();
  @Input() color: ThemePalette;
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  // @ViewChild(MatSort) sort: MatSort | null = null;
  iconMetdata: IconMetadata = iconMetdata;
  filterInput: FormControl = new FormControl('');
  filteredIcons: Observable<IconElement[]> | null = null;
  filteredIconslength: number = 0;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let trigger$ = [
      this.filterInput.valueChanges.pipe(startWith(''), tap(() => this.paginator?.firstPage()))
    ];
    if (this.paginator?.page) trigger$.push(this.paginator.page);
    this.filteredIcons = merge(...trigger$).pipe(
      map(value => {
        const lower = this.filterInput.value.toLowerCase();
        return this.iconMetdata.icons.filter((icon: IconElement) => {
          let match = false;
          match = icon.name.toLowerCase().includes(lower);
          if (!match && icon.tags.length) {
            return icon.tags.reduce((acc, tag) => {
              return tag.toLowerCase().includes(lower);
            }, new Boolean(false));
          }
          return match;
        });
      }),
      tap((icons) => this.filteredIconslength = icons.length),
      map((icons) => {
        const start = (this.paginator?.pageIndex || 0) * (this.paginator?.pageSize || 0);
        const end = start + (this.paginator?.pageSize || 0);
        return icons.slice(start, end)
      })
    );
  }

  selectIcon(icon: string) {
    this.icon = icon;
    this.iconChange.emit(icon)
  }

}
