import { Component,  } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  styleUrls: ['./navigation.component.scss']

})

export class MyNavigation {
}
