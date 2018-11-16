import { Component, OnInit } from '@angular/core';
import {BillService } from '../../../service/bill.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-bill-dialog',
  templateUrl: './bill-dialog.component.html',
  styleUrls: ['./bill-dialog.component.scss']
})
export class BillDialogComponent implements OnInit {
  billForm:FormGroup;
  displayedColumns: string[] = ['productName', 'productQuan', 'quan','price', ];
  productData=[];
  billData=[];
  pageLength:any;
  errorMSG:any;
  selectedValue:any;
  Quantity:number = 0;
  price:number = 0;
  key:any;
  id:any;
  billNumber:number = 1;
  totalBillingPrice:number;
  //dataSource :MatTableDataSource<tableHeader>;
  stockKey:any;
  productPrice:number;
  productQuantity:number;
  totalPrice:number = 0;
  constructor(private billServ:BillService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadPage();
    this.formCntrl();
    //this.billServ.getBill();
    this.billLoad();
  }

  billLoad(){
    this.billNumber = Math.floor(1000 + Math.random() * 9000);
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


        //this.dataSource = new MatTableDataSource(this.productData);
        /*this.totalPrice = this.productQuantity * this.productPrice;
        this.pageLength = this.productData.length;
        
        this.dataSource.paginator = this.paginator;*/

      });
  }

  formCntrl(){
    this.billForm = this.formBuilder.group({
      $key:[,''],
      product_ID:[null,],
      product_Name:[null,],
      product_Quantity:[0,],
      product_Price:[0,],
      product_total:[null,],
      billing_Quantity:[null,],
      billing_Price:[null,],
      bill_No:[null,]
    })
  }
  
  loadPage()
  {
    this.billNumber = Math.floor(1000 + Math.random() * 9000);
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


        //this.dataSource = new MatTableDataSource(this.productData);
        /*this.totalPrice = this.productQuantity * this.productPrice;
        this.pageLength = this.productData.length;
        
        this.dataSource.paginator = this.paginator;*/

      });
  }

  itemDetail($key, name , id, quan, price){
    console.log("Item Details" +$key, +name, +id, +quan, +price)
  this.stockKey= $key;
    this.Quantity = quan;
    this.price =price;
    console.log("quantity" +this.Quantity);
    //this.billForm.value.billing_Quantity = 0;
  }

  quantity(event){
    this.productQuantity = event.currentTarget.value;
      
    //this.price = this.productQuantity * this.price;
    this.totalBillingPrice = this.productQuantity * this.price;
  }

  priceChange(event){
    this.totalBillingPrice = event.currentTarget.value * this.productQuantity;
  }
avlbQuan:number;
  billSubmit(){
    console.log("s"  +this.billForm.value.bill_No);
    this.avlbQuan = this.Quantity - this.productQuantity;
    this.billServ.postBill(this.billForm.value, this.totalBillingPrice, this.productQuantity, this.price, this.stockKey, this.avlbQuan ) ;
  }
}
