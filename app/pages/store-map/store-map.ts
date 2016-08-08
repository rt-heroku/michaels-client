import { Component, ViewChild, ElementRef,ViewContainerRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery';

@Component({
  templateUrl: 'build/pages/store-map/store-map.html',
})
export class StoreMapPage {

  private aisle;

 @ViewChild('storemap', {read: ViewContainerRef}) m: HTMLElement; 

  constructor(private nav: NavController, navParams: NavParams) {
    this.aisle = navParams.get('aisle');
    this.changeColorById(this.aisle);
  }

  changeColor(){
    $( "svg" ).find( "#RESTROOM_aisle" ).css({ fill: "#ff0000" });
    $( "svg" ).find( "#RESTROOM_aisle" ).css({ opacity: "1" });

  }
  changeColorById(id){
    setTimeout(() => this.showDelay(id), 250);
  }
  showDelay(id){
    console.log('changing color of --- ' + id);
      // $( "svg" ).find( "#" + id + '_aisle').css({ fill: "#ff0000" });
      // $( "svg" ).find( "#" + id + '_aisle').css({ opacity: "1" });

      // $( "svg" ).find( "#" + id + '_pin').css({ fill: "#ff0000" });
      // $( "svg" ).find( "#" + id + '_pin').css({ opacity: "1" });

      $( "#" + id + '_aisle').css({ fill: "#fff400" });
      $( "#" + id + '_aisle').css({ opacity: "1" });

      $( "#" + id + '_pin').css({ fill: "#ff0000" });
      $( "#" + id + '_pin').css({ opacity: "1" });

  }
}
