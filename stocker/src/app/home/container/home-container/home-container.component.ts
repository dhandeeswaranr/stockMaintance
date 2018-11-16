import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import {BillService } from '../../../service/bill.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ExportExcelService } from '../../../export-excel.service'

@Component({
  selector: 'home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit, OnChanges {
  ProductForm:FormGroup;
  displayedColumns: string[] = ['productId', 'productName', 'productQuan', 'price', 'total', 'action',];
  productData=[];
  pageLength:any;
  errorMSG:any;
  dataSource :MatTableDataSource<tableHeader>;

  productPrice:number;
  productQuantity:number;
  totalPrice:number = 0;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private serv:BillService, private formBuilder: FormBuilder, private excelService:ExportExcelService) { }

  ngOnInit() {
   this.totalPrice = 0;
    console.log("dtsrc" +this.dataSource);
    
    this.loadData();
    this.formCntrl();
  }
 ngOnChanges(){
 // this.totalPrice = this.productQuantity * this.productPrice;
  //this.ProductForm.value.product_total = this.totalPrice;
 }
formCntrl(){
  this.ProductForm = this.formBuilder.group({
    $key:[,''],
    product_ID:[null,],
    product_Name:[null,],
    product_Quantity:[0,],
    product_Price:[0,],
    product_total:[null,]

  })
}

  loadData(){
    this.serv.getServiceData().subscribe( 
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
          this.totalPrice = this.productQuantity * this.productPrice;
        this.pageLength = this.productData.length;
        this.dataSource = new MatTableDataSource(this.productData);
        this.dataSource.paginator = this.paginator;

      });
  }

  price(event){
    this.productPrice = event.currentTarget.value;
    console.log("test" +event.currentTarget.value)
    this.sum();
  }
  quantity(event){
    this.productQuantity = event.currentTarget.value;
    this.sum();
  }
 
  sum(){
    this.totalPrice = this.productQuantity * this.productPrice;
  }
  isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 46 ||  charCode > 57)) {
        return false;
    }
    return true;
}
addProduct(){
  this.totalPrice = this.productQuantity * this.productPrice;
  this.ProductForm.value.product_total = this.totalPrice;
  
    if(this.ProductForm.value.product_ID == null || this.ProductForm.value.product_ID == ''){
      this.errorMSG ="*Please fill the product Id"
    }
    else if(this.ProductForm.value.product_Name == null || this.ProductForm.value.product_Name == ''){

      this.errorMSG ="*Please fill the product Name"
    }
    else if(this.ProductForm.value.product_Quantity == null || this.ProductForm.value.product_Quantity == ''){
      this.errorMSG ="*Please fill the product Quantity"
    }
    else if(this.ProductForm.value.product_Price == null || this.ProductForm.value.product_Price == ''){
      this.errorMSG ="*Please fill the product Price"
    }
    
    else{
      
      this.serv.postServiceData(this.ProductForm.value);
      this.errorMSG ="Success"
      console.log("total" +this.ProductForm.value.product_total)
      this.ProductForm.reset();
    }
 
  
}
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

del($key:any){
console.log("event");
this.serv.del($key);
}

tes(event){
console.log("adsf" +event);
}
exportAsXLSX():void {
  this.excelService.exportAsExcelFile(this.productData, 'sample');
}

print(): void {
  let printContents, popupWin;
  printContents = document.getElementById('print-section').innerHTML;
  popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  popupWin.document.open();
  popupWin.document.write(`
    <html>
      <head>
        <title>Print tab</title>
        <style>
        //........Customized style.......
        </style>
      </head>
  <body onload="window.print();window.close()">${printContents}</body>
    </html>`
  );
  popupWin.document.close();
}
}

export interface tableHeader{
  productId:any;
  productName:any;
}
//const ELEMENT_DATA: tableHeader[] = [this.productData.];