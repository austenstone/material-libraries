import { NgModule } from '@angular/core';
import { MaterialModule } from 'projects/material-icon-list-demo/src/app/material-module';
import { MaterialIconListComponent } from './material-icon-list.component';
import { MaterialIconListComponent as MaterialIconListComponent2 } from './material-icon-list/material-icon-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    MaterialIconListComponent,
    MaterialIconListComponent2
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
  ],
  exports: [
    MaterialIconListComponent,
    MaterialIconListComponent2
  ]
})
export class MaterialIconListModule { }
