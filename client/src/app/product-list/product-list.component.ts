import { Component, OnInit } from '@angular/core';
import { ProductApiService } from '../product-api.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  Data: any; 
  constructor(private _inventory : ProductApiService) { }

  ngOnInit() {
    var inventoryObservable = this._inventory
      .getAll()
      .subscribe(data => {
        console.log("\n this is the subscribed Data");
        console.log(data);
        this.Data = data;
      })
  }
}
