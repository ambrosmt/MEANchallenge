import { Component, OnInit } from '@angular/core';
import { ProductApiService } from '../product-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  item: any;
  itemId: any;
  canRemove: boolean;
  constructor(private _inventory: ProductApiService, private router: Router) { }

  ngOnInit() {
    var url = location.toString();
    this.itemId = url.slice(30);
    console.log(this.itemId)
    var itemObservable = this._inventory
      .getData(this.itemId)
      .subscribe(res => {
        console.log("\n this is the subscribed Data");
        console.log(res);
        this.item = res;
        if(this.item.qty > 0){
          this.canRemove = false;
        }
        else{
          this.canRemove = true; 
        }
      })
  }
  removeItem(){
    var itemObservable = this._inventory
      .deleteItem(this.itemId)
      .subscribe(data => {
        this.router.navigate(['']);
      });
  }
}
