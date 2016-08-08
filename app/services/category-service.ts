import {Injectable} from "@angular/core";
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {
  private categories:any;

  private records: any;

  constructor(private http:Http) {
    this.load();
  }

  load() {
  //  console.log('Retrieving all categories!');
    this.http.get('http://michaels-services.herokuapp.com/api/v1/dw/categories').map(res => res.json()).subscribe(data => {
        this.categories = data.data.categories;
        //console.log('how many categories? ' + this.categories.length);
        console.dir(this.categories);
    });
  }
  
  loadProductsByCategory(cat){
    let service = 'http://michaels-services.herokuapp.com/api/v1/dw/products/search?&cgid=' + cat;
    console.log('Retrieving all products! - ' + cat + '\n' + service);
    return this.http.get(service).map(res => res.json());
  }

  loadProductsForHomePage(cat){
    let service = 'http://michaels-services.herokuapp.com/api/v1/dw/products/search?q=new&start=0&count=2&cgid=Categories';
    console.log('Retrieving products for homepage! - ' + service);
    return this.http.get(service).map(res => res.json());
  }

  setRecords(r){
    this.records = r;
  }

  getAll(){
    try{
      //console.log('CategoryService -> getAll - ' + this.categories.length);
      return this.categories;
    }catch(e){
      return null;
    }
  }

  getRecord(id) {
   for (var i = 0; i < this.records.length; i++) {
      if (this.records[i].product_id === id) {
        return this.records[i];
      }
    }
    return null;
  }

  getItem(id) {
   for (var i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id === id) {
        return this.categories[i];
      }
    }
    return null;
  }

  remove(item) {
    this.categories.splice(this.categories.indexOf(item), 1);
  }
}