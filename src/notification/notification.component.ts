import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { NgbNotificationType } from './notification.service';

export const NOTIFICATION_ANIMATION_TIME = 100;

@Component({
	templateUrl: './notification.component.html',
	styleUrl: './notification.component.scss',
	selector: 'ngb-notification',
	standalone: true,
	imports: [CommonModule],
	animations: [
		trigger('openCloseTopBottom', [
			transition(':enter', [
				style({ opacity: 0, transform: 'translate(-50%, 1em)' }),
				animate(NOTIFICATION_ANIMATION_TIME, style({ opacity: 1, transform: 'translate(-50%, 0)' }))
			]),
			transition(':leave', [
				animate(NOTIFICATION_ANIMATION_TIME, style({ opacity: 0, transform: 'translate(-50%, -1em)' }))
			])
		]),
		trigger('openCloseCorner', [
			transition(':enter', [
				style({ opacity: 0, transform: 'translateY(1em)' }),
				animate(NOTIFICATION_ANIMATION_TIME, style({ opacity: 1, transform: 'translateY(0)' }))
			]),
			transition(':leave', [animate(NOTIFICATION_ANIMATION_TIME, style({ opacity: 0, transform: 'translateY(-1em)' }))])
		])
	]
})
export class NgbNotificationComponent {
	text: string = '';
	isClearable: boolean = true;
	position: string = 'top-right';
	isOpen: boolean = false;
	type: NgbNotificationType = 'none';

	ngOnInit() {
		this.isOpen = true;
	}

	handleClose() {
		this.isOpen = false;
		timer(NOTIFICATION_ANIMATION_TIME).subscribe(() => this.deleteNotification());
	}

	deleteNotification() {
		// set in NgbNotificationService
	}

	isCorner() {
		return this.position !== 'top' && this.position !== 'bottom';
	}

	closeOnEsc(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			this.handleClose();
		}
	}
}
