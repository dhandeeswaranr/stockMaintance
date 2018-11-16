import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeContainerComponent } from './container/home-container/home-container.component';
import { AngularMaterialModule} from '../angular-material/angular-material.module';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import {BillService } from '../service/bill.service';
import { ExportExcelService } from '../export-excel.service';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireModule} from 'angularfire2';
import { RouterModule} from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      {
        path:'',
        component:HomeContainerComponent
        
      }
    ])
  ],
  declarations: [HomeContainerComponent],
  exports:
  [
    HomeContainerComponent
  ],
providers:[BillService, ExportExcelService]
})
export class HomeModule { }
