import { Component } from '@angular/core';
import { LoaderService } from './shared/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'httpclient';

  constructor(public loader: LoaderService){}
}
