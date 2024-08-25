import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbSelectComponent } from '../select/select.component';
import {
	NgbNotificationPosition,
	NgbNotificationService,
	NgbNotificationType
} from '../notification/notification.service';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'ngb-root',
	standalone: true,
	imports: [RouterOutlet, NgbSelectComponent, FormsModule],
	providers: [NgbNotificationService],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	constructor(private notificationService: NgbNotificationService) {}
	title = 'ng-bulma';
	notificationPosition: NgbNotificationPosition = 'top';
	notificationColor: NgbNotificationType = 'none';
	notificationText: string = 'test';

	notify() {
		this.notificationService.notify(this.notificationText, {
			position: this.notificationPosition,
			isClearable: true,
			type: this.notificationColor,
			timeout: 2000
		});
	}
}
