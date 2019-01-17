import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) {}

  title = 'shopify-challenge';
  data;
  searchedResult = [];
  favourites = [];

  ngOnInit() {
    this.http.get('api/get').subscribe((data) => {
      this.data = data;
    });
  }

  search() {
    let searchValue = (<HTMLInputElement>document.getElementById('search')).value;
    // console.log('searching', searchValue);
    if (searchValue) {
      for (var key in this.data) {
        if (this.data[key].keywords.toLowerCase().includes(searchValue.toLowerCase())) {
          if (!this.searchedResult.includes(this.data[key])) {
            this.data[key].body = this.data[key].body.split('&lt;').join('<').split('&gt;').join('>').split(/&amp;nbsp;/g).join(' ');
            this.data[key].favourite = false;
            this.searchedResult.push(this.data[key]);
          }
        }
      }
    }
  }

  addToFavourite(item) {
    if (!this.favourites.includes(item)) {
      item.favourite = true;
      this.favourites.push(item);
      // console.log('added');
    }
  }

  removeFromFavourite(item) {
    item.favourite = false;
    this.favourites.splice(item, 1);
   // console.log('removed');
  }

  getIconColour(item) {
    // console.log('getting colour', item);
    if (item.favourite) {
      return {'color': '#2B985E'};
    }
    return {'colour': '#D3D3D3'};
  }

}
