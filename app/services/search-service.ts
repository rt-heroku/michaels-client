import {Injectable} from "@angular/core";
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  private item: any;

  constructor(private http:Http) {  }

  searchProductsByTerm(term, start, count, category){
    let service = 'http://michaels-services.herokuapp.com/api/v1/dw/products/search?q=' + term + '&cgid=' + category +
                  '&start=' + start + '&count=' + count;
    console.log('Searching products - ' + term + '\n' + service);
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
