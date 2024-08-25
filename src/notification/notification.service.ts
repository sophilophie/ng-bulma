import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { NgbNotificationComponent, NOTIFICATION_ANIMATION_TIME } from './notification.component';
import { timer } from 'rxjs';

export type NgbNotificationOptions = {
	timeout?: number;
	isClearable?: boolean;
	position?: NgbNotificationPosition;
	type?: NgbNotificationType;
};

export type NgbNotificationPosition = 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
export type NgbNotificationType = 'link' | 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'none';

@Injectable()
export class NgbNotificationService {
	private componentRef!: ComponentRef<NgbNotificationComponent>;

	constructor(private viewContainerRef: ViewContainerRef) {}

	notify(text: string, options: NgbNotificationOptions) {
		if (this.componentRef) {
			this.componentRef.instance.isOpen = false;
			this.componentRef.changeDetectorRef.detectChanges();
			timer(NOTIFICATION_ANIMATION_TIME).subscribe(() => {
				this.componentRef.destroy();
				this.constructComponent(text, options);
			});
		} else {
			this.constructComponent(text, options);
		}
	}

	private constructComponent(text: string, options: NgbNotificationOptions) {
		const { isClearable, position, timeout, type } = options;
		this.componentRef = this.viewContainerRef.createComponent(NgbNotificationComponent);
		this.componentRef.instance.text = text;
		this.componentRef.instance.isClearable = isClearable ?? false;
		this.componentRef.instance.position = position || 'top';
		this.componentRef.instance.type = type || 'none';
		this.componentRef.instance.deleteNotification = () => this.componentRef.destroy();
		this.componentRef.changeDetectorRef.detectChanges();
		if (timeout) {
			timer(timeout).subscribe(() => {
				this.componentRef.instance.isOpen = false;
				this.componentRef.changeDetectorRef.detectChanges();
				timer(NOTIFICATION_ANIMATION_TIME).subscribe(() => this.componentRef.destroy());
			});
		}
	}
}
