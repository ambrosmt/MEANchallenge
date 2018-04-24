import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductApiService } from '../product-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {
  item: any;
  err: String;
  submit:Boolean;
  constructor(private _inventory: ProductApiService, private router: Router) { }

  ngOnInit() {
    this.item = {
      "name": "",
      "qty": 1,
      "price": 1, 
    }
    this.submit = false;
  }
  onTxtChange(raw: string) {
    if (raw.length > 2) {
      this.submit = true;
    }
    else{
      this.submit = false;
    }
  }
  onSubmit(){
    console.log("form submitted");
    console.log(this.item);
    this._inventory.postItem(this.item)
      .subscribe(data => {
        this.router.navigate(['']);
      });
  }
}
