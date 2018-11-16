import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private firebase:AngularFireDatabase) { }
Item:AngularFireList<any>;
billerModel:AngularFireList<any>;
stockeyVa:any;
form = new FormGroup({
    $key:new FormControl(null),
    product_ID:new FormControl(''),
    product_Name:new FormControl(''),
    product_Quantity:new FormControl(''),
    product_Price:new FormControl(''),
    product_total:new FormControl('')
    
    
})

bill = new FormGroup({
  $key:new FormControl(null),
  bill_No:new FormControl(''),
  product_Name:new FormControl(''),
  product_Quantity:new FormControl(''),
  product_Price:new FormControl(''),
  total_bill:new FormControl('')

})

  getServiceData(){
    this.Item = this.firebase.list('customers');
    return this.Item.snapshotChanges();
  }

  postServiceData(productData){
    console.log("ser Data" +productData.totalPrice)
    this.Item.push({
      productName:productData.product_Name,
      productId:productData.product_ID,
      productQunatity:productData.product_Quantity,
      productPrice:productData.product_Price,
      totalPrice:productData.product_total
    })
    
  }
  
delid:any;
  del($key:string){
   // this.delid = productData;
    console.log("del sev " +$key.toString());
 this.Item.remove($key);
  
  
}
delitem:any;
updateQuan:number;
  delItem($key:string, quan, stockKey){
   // this.delid = productData;
   this.stockeyVa = stockKey
   this.updateQuan = quan;
    console.log("del sev " +$key.toString());
 this.billerModel.remove($key);
  this.del_updateStock();
  
}

del_updateStock(){
  var avlQuan;
  
  this.Item.update(this.stockeyVa, {
    productQunatity:''
  })
}



getBill(){
  this.billerModel = this.firebase.list('billing');
  return this.billerModel.snapshotChanges();
}
avalQuan:number;
postBill(billing, tot, quan, price, stockKey, avlQuan){
  console.log("biil" +billing.total_bill)
 this.avalQuan = avlQuan;
this.stockeyVa = stockKey
  this.billerModel.push({
    stockKey:this.stockeyVa,
    billNo:billing.bill_No,
    foodName:billing.product_Name,
    foodQuantity:quan,
    productPrice:price,
    totalBill:tot
  })
  
  this.updateStock();
}

updateStock(){
  var avlQuan;
  
  this.Item.update(this.stockeyVa, {
    productQunatity:this.avalQuan
  })
}
}
