import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule,
  MatDialogModule,
  MatSelectModule

} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule
  ],
  declarations: [],
  exports:[
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule
  ]
})
export class AngularMaterialModule { }
