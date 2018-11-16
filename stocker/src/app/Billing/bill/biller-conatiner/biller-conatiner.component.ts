import { Component, OnInit, ViewChild } from '@angular/core';
import {BillService } from '../../../service/bill.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {BillDialogComponent } from '../bill-dialog/bill-dialog.component'
@Component({
  selector: 'biller-conatiner',
  templateUrl: './biller-conatiner.component.html',
  styleUrls: ['./biller-conatiner.component.scss']
})
export class BillerConatinerComponent implements OnInit {

  ProductForm:FormGroup;
  displayedColumns: string[] = ['productName', 'productQuan', 'quan', 'price','ItemBill', 'actions' ];
  productData=[];

  billData = [];
  pageLength:any;
  errorMSG:any;
  dataSource :MatTableDataSource<tableHeader>;

  productPrice:number;
  productQuantity:number;
  totalPrice:number = 0;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private billServ:BillService, public dialog: MatDialog) { }

  ngOnInit() {
    this.billLoad();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BillDialogComponent, {
      width: '80%',
     // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  billLoad(){
   // this.billNumber = Math.floor(1000 + Math.random() * 9000);
    this.billServ.getBill().subscribe( 
      billData =>
      {

        this.billData = billData .map(
          ProductBill =>
          {
          console.log("log" +ProductBill.key)
         
          return {
                  $key:ProductBill.key,
                  ...ProductBill.payload.val()
          }

           
          });


        this.dataSource = new MatTableDataSource(this.billData);
        /*this.totalPrice = this.productQuantity * this.productPrice;
        this.pageLength = this.productData.length;
        
        this.dataSource.paginator = this.paginator;*/

      });
  }

  loadPage()
  {
    this.billServ.getServiceData().subscribe( 
      productData =>
      {

        this.productData = productData .map(
          Product =>
          {
          console.log("log" +Product.key)
         
          return {
                  $key:Product.key,
                  ...Product.payload.val()
          }

           
          });
          this.dataSource = new MatTableDataSource(this.productData);
        /*this.totalPrice = this.productQuantity * this.productPrice;
        this.pageLength = this.productData.length;
        
        this.dataSource.paginator = this.paginator;*/

      });
  }
  getTotalCost() {
    return 0;
     this.productData.map(t => t.productQuantity).reduce((acc, value) => acc + value, 0);
    // console.log(" tot" + t );
    this.dataSource = new MatTableDataSource(this.productData);
    // return  JSON.stringify(this.dataSource)  
    
  }

  del($key:any, quan, stockKey){
    
    console.log("del Quna" + quan);
   this.billServ.delItem($key, quan, stockKey);
    }
   //datas = Object.assign( this.dataSource);

   addRow(){
     this.dataSource.data.push({
      productId:'',
      productName:'',

     })
   }
   
}


export interface tableHeader{
  productId:any;
  productName:any;
}