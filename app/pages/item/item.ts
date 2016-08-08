import {Component} from '@angular/core';
import {NavController, NavParams, Modal} from 'ionic-angular';
import {CategoryService} from '../../services/category-service';
import {ItemService} from '../../services/item-service';
import {StoreLocationService} from '../../services/store-location-service';
import {ModalItemOptionPage} from "../modal-item-option/modal-item-option";
import {StoreMapPage} from "../../pages/store-map/store-map";
import {HomePage} from "../../pages/home/home";

@Component({
  templateUrl: 'build/pages/item/item.html',
  providers: [ItemService]
})
export class ItemPage {
  // item info
  private item: any;
  private id;
  private product: any;

  constructor(private nav: NavController, 
            private itemService: ItemService, private categoryService: CategoryService, private storeLocationService: StoreLocationService,
            navParams: NavParams) {

    this.id = navParams.get('id');
    this.product = categoryService.getRecord(this.id);
    this.item = navParams.get('item');
  }

  // add or remove item on wish list
  toggleWishList (item) {
    item.on_wish_list = !item.on_wish_list;
  }

  // get item options group name
  getOptionGroupsName(item) {
    let optionGroups = [];
    for (let i = 0; i < item.option_groups.length; i++) {
      optionGroups.push(item.option_groups[i].name);
    }

    return optionGroups.join(',');
  }

  // make array with range is n
  range(n) {
    return new Array(n);
  }

  // open item option modal
  showOptions(item) {
    // show modal
    let modal = Modal.create(ModalItemOptionPage, {item: item});

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

  openMap(id){

    this.storeLocationService.locateProduct(id).subscribe(data => {
      console.dir(data.data);
      console.log('getting aisle -> locateProduct -> [' + data.data.aisle + ']');
	    this.nav.push(StoreMapPage, {aisle: data.data.aisle});
    },
           err => {
           console.error(err);
        },
        () => console.log('HomePage -> loadProductById completed')
    );

  }
  
  goHome(){
    this.nav.push(HomePage);
  }

}
