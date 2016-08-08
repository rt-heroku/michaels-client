import {Injectable} from "@angular/core";
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StoreLocationService {

  private item: any;

  constructor(private http:Http) {  }

  locateProduct(id){
    let service = 'http://michaels-services.herokuapp.com/api/v1/productlocation/' + id
    console.log('Searching products - ' + id + '\n' + service);
    return this.http.get(service).map(res => res.json());
  }

  setItem(i){
    this.item = i;
  }

  getItem(){
    return this.item;
  }

}
