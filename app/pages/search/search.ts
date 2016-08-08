import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CategoryService} from '../../services/category-service';
import {SearchService} from '../../services/search-service';
import {ItemService} from '../../services/item-service';
import {ItemPage} from "../item/item";

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/search/search.html',
})
export class SearchPage {

  private products: any;
  private search;
  constructor(private nav: NavController, 
              private itemService: ItemService, 
              private categoryService: CategoryService, 
              private searchService: SearchService) {
    this.search = false;
  }

  searchProducts(term){
    this.searchService.searchProductsByTerm(term, 0, 25,'Categories').subscribe(data => {
      console.log('getting item in HomePage -> loadProductById');
      this.products = data.data.hits;
      this.categoryService.setRecords(this.products);
      this.search = true;
      console.dir(this.products);
    },
           err => {
           console.error(err);
        },
        () => console.log('SearchPage -> searchProducts completed')
    );
  }

  // view a item
  viewItem(itemId) {
    this.itemService.loadProductById(itemId).subscribe(data => {
      console.log('SearchPage -> getting item -> loadProductById - ' + itemId);
      this.itemService.setItem(data.data);
      this.nav.push(ItemPage, {id: itemId, item: data.data})
    },
           err => {
           console.error(err);
        },
        () => console.log('CateogryPage -> loadProductById completed')
    );
  }
  // get discount percent
  discountPercent(originPrice, salePrice) {
    return Math.round((salePrice - originPrice) * 100 / originPrice)
  }

}