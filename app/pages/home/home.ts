import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CategoryService} from '../../services/category-service';
import {ItemService} from '../../services/item-service';
import {CategoriesPage} from "../categories/categories";
import {CategoryPage} from "../category/category";
import {ItemPage} from "../item/item";
import {SearchPage} from "../search/search";
import {CartPage} from "../cart/cart";
import {StoreMapPage} from "../store-map/store-map";

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {
  // list slides for slider
  private slides = [
    {
      src: 'http://www.michaels.com/static/on/demandware.static/-/Sites-MichaelsUS-Library/default/dw68029f13/images/homepage/tier1/tier1-072616-02.png'
    },
    {
      src: 'http://www.michaels.com/static/on/demandware.static/-/Sites-MichaelsUS-Library/default/dwb3f04adb/images/homepage/tier1/tier1-072416-01.png'
    },
    {
      src: 'http://www.michaels.com/static/on/demandware.static/-/Sites-MichaelsUS-Library/default/dw0b1bdf25/images/homepage/tier6-072416-02.png'
    },
    {
      src: 'http://www.michaels.com/static/on/demandware.static/-/Sites-MichaelsUS-Library/default/dwebeeda87/images/homepage/tier6-072516-03.png'
    }
  ];

  // list categories
  private categories: any;

  // list of items
  private items: any;

  constructor(private nav: NavController, private categoryService: CategoryService, private itemService: ItemService) {
//    this.items = itemService.getAll();
    this.categories = this.getCategories();
    this.categoryService.loadProductsForHomePage('Categories').subscribe(data => {
      console.log('getting item in HomePage -> loadProductById');
      this.items = data.data.hits;
      categoryService.setRecords(this.items);
      console.dir(this.items);
    },
           err => {
           console.error(err);
        },
        () => console.log('HomePage -> loadProductById completed')
    );

  }
  
  getCategories(){
  //  console.log('about to get all categories');
    return this.categoryService.getAll();
  }
  // view categories
  viewCategories() {
    this.nav.push(CategoriesPage);
  }

  // view a category
  viewCategory(catId) {
    this.nav.push(CategoryPage, {id: catId});
  }

  // view a item
  viewItem(itemId) {
    this.itemService.loadProductById(itemId).subscribe(data => {
      console.log('getting item -> loadProductById');
      this.itemService.setItem(data.data);
      this.nav.push(ItemPage, {id: itemId, item: data.data})
    },
           err => {
           console.error(err);
        },
        () => console.log('HomePage -> loadProductById completed')
    );
  }

  openMap(){
    this.nav.push(StoreMapPage);
  }

  // go to search page
  goToSearch() {
    this.nav.push(SearchPage);
  }

  // view cart
  goToCart() {
    this.nav.setRoot(CartPage);
  }
}
