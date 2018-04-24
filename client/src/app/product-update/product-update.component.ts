import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductApiService } from '../product-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  item: any;
  Id: any; 
  nameErr: any;
  valErr: any;
  submit: boolean;
  constructor(private _inventory: ProductApiService, private router: Router) { }

  ngOnInit() {
    var url = location.toString();
    var itemId = url.slice(29);
    this.Id = itemId;
    this.submit=true;
    console.log(itemId);
    var itemObservable = this._inventory
      .getData(this.Id)
      .subscribe(res => {
        console.log("\n this is the subscribed Data");
        console.log(res);
        this.item = res;
      })
  }
  onSubmit() {
    console.log("form submitted");
    console.log(this.item);
    this._inventory.editItem(this.Id,this.item)
      .subscribe(data => {
        this.router.navigate(['']);
      });
  }
  onTxtChange(raw: string) {
    if (raw.length < 3) {
      this.nameErr = "Please Use a Name longer than 3 characters";
      this.submit=false;
    }
    else {
      this.nameErr = false;
      this.submit=true
    }
  }
  amountChange(raw: number) {
    if (raw <= 0) {
      this.valErr = "Plese use a price Higher than 0";
      this.submit=false;
    }
    else {
      this.valErr = false;
      this.submit=true;
    }
  }
}