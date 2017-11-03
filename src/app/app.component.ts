import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Catalogos';
  selectedIndex=-1;
  setSelected(id: number) {
    this.selectedIndex = id;
  }
}

