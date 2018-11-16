import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularMaterialModule } from '../../angular-material/angular-material.module'
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import {BillService } from '../../service/bill.service';
import { ExportExcelService } from '../../export-excel.service';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireModule} from 'angularfire2';
import { RouterModule} from '@angular/router';
import {BillerConatinerComponent } from './biller-conatiner/biller-conatiner.component';
import { BillDialogComponent } from './bill-dialog/bill-dialog.component'
@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    RouterModule.forRoot([
      {
        path:'',
        component:BillerConatinerComponent
        
      }
    ])
  ],
  declarations: [BillerConatinerComponent, BillDialogComponent],
  exports:[
    BillerConatinerComponent
  ],
  entryComponents:[BillDialogComponent],
  providers:[BillService]
})
export class BillModule { }
