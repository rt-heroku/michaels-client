import {Injectable} from "@angular/core";
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemService {

  private item: any;

  constructor(private http:Http) {  }

  loadProductById(id){
    let service = 'http://michaels-services.herokuapp.com/api/v1/dw/products/' + id;
    console.log('Retrieving product! - ' + id + '\n' + service);
    return this.http.get(service).map(res => res.json());
  }

  setItem(i){
    this.item = i;
  }

  getItem(){
    return this.item;
  }

  getAll(){
    return null;
  }

}
