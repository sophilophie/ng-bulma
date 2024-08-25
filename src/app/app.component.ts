import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgbSelectComponent} from '../select/select.component';

@Component({
	selector: 'ngb-root',
	standalone: true,
	imports: [RouterOutlet, NgbSelectComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	title = 'ng-bulma';
}
