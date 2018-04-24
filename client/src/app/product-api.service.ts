import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductApiService {

  constructor(private _inventory: HttpClient) { }

  getAll(){
    return this._inventory.get('/products')
  }
  getData(id){
    return this._inventory.get('/product/'+id)
  }
  postItem(itmObj){
    return this._inventory.post('/product/new', itmObj);
  }
  deleteItem(itemId){
    return this._inventory.delete('/product/delete/'+itemId);
  }
  editItem(itemId, itemObj){
    return this._inventory.put('/product/edit/'+itemId, itemObj);
  }
}
