import {Component} from '@angular/core';
import {NavController, NavParams, ActionSheet, Modal} from 'ionic-angular';
import {CategoryService} from '../../services/category-service';
import {ItemService} from '../../services/item-service';
import {ModalFilterPage} from "../modal-filter/modal-filter";
import {ItemPage} from "../item/item";
import {CartPage} from "../cart/cart";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/category/category.html'
})
export class CategoryPage {
  // list items of this category
  private items:any;

  // category info
  private category:any;
  private cat;

  // view type
  private viewType = 'list';

  // sort by
  private sortBy = 'Best Match';

  constructor(private nav:NavController, private categoryService:CategoryService, private itemService: ItemService, navParams: NavParams) {
    this.cat = navParams.get('id');
    this.category = categoryService.getItem(this.cat);
    console.log('Retrieving category -> ' + this.cat);
    
    // set category info
    categoryService.loadProductsByCategory(this.cat).subscribe(data => {
      this.items = data.data.hits;
      categoryService.setRecords(this.items);
    },
        err => {
           console.error(err);
        },
        () => console.log('loadProductsByCategory completed')
    );

  }

  // switch to list view
  viewList() {
    this.viewType = 'list';
  }

  // swith to grid view
  viewGrid() {
    this.viewType = 'grid';
  }

  // get discount percent
  discountPercent(originPrice, salePrice) {
    return Math.round((salePrice - originPrice) * 100 / originPrice)
  }

  // choose sort by
  chooseSortBy() {
    let actionSheet = ActionSheet.create({
      buttons: [
        {
          text: 'Best Match',
          handler: () => {
            this.sortBy = 'Best Match';
          }
        },
        {
          text: 'Lowest Price First',
          handler: () => {
            this.sortBy = 'Lowest Price First';
          }
        },
        {
          text: 'Highest Price First',
          handler: () => {
            this.sortBy = 'Highest Price First';
          }
        },
        {
          text: 'No. of orders',
          handler: () => {
            this.sortBy = 'No. of orders';
          }
        },
        {
          text: 'Seller Rating',
          handler: () => {
            this.sortBy = 'Seller Rating';
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    this.nav.present(actionSheet);
  }

  // show filter modal
  openFilter(tabName) {
    // show modal
    let modal = Modal.create(ModalFilterPage, {tabName: tabName});

    // listen for modal close
    modal.onDismiss(confirm => {
      if (confirm) {
        // apply filter here
      } else {
        // do nothing
      }
    });

    this.nav.present(modal);
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
        () => console.log('CateogryPage -> loadProductById completed')
    );
  }

  // view cart
  goToCart() {
    this.nav.setRoot(CartPage);
  }
}
