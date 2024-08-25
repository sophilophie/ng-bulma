import { CommonModule } from '@angular/common';
import {
	Component,
	ElementRef,
	EventEmitter,
	forwardRef,
	Input,
	OnInit,
	Output,
	QueryList,
	ViewChild,
	ViewChildren
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'ngb-select',
	standalone: true,
	imports: [CommonModule, FormsModule],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => NgbSelectComponent),
			multi: true
		}
	],
	templateUrl: './select.component.html',
	styleUrl: './select.component.scss'
})
export class NgbSelectComponent implements ControlValueAccessor, OnInit {
	@Input() isUp: boolean = false;
	@Input() placeholder: string = '';
	@Input() items: string[] = [];
	@Input() ngModel: string = '';
	@Output() ngModelChange: EventEmitter<string> = new EventEmitter();

	get selectedItem() {
		return this.ngModel;
	}

	set selectedItem(value) {
		this.ngModel = value;
		this.propagateChange(this.ngModel);
	}

	@ViewChild('filterInput') filterInput!: ElementRef;
	@ViewChildren('itemAnchor') itemAnchors!: QueryList<ElementRef>;

	filterTerm: string = '';
	isOpen: boolean = false;
	hasFocus: boolean = false;
	displayedItems: string[] = [];
	propagateChange: (_: string) => void = (_: string) => {
		_;
	};

	ngOnInit(): void {
		this.displayedItems = this.items;
	}

	writeValue(value: string): void {
		this.selectedItem = value;
	}

	registerOnChange(fn: (_: string) => void): void {
		this.propagateChange = fn;
	}

	registerOnTouched(): void {}

	filterItems() {
		this.displayedItems = this.items.filter((item) => {
			return item.includes(this.filterTerm);
		});
	}

	openDropdown(): void {
		this.isOpen = true;
	}

	closeDropdownOnInputBlur($event: FocusEvent): void {
		if (!($event.relatedTarget as Element)?.classList.contains('dropdown-item')) {
			this.isOpen = false;
		}
	}

	closeDropdownOnEsc(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			if (this.filterTerm) {
				this.filterTerm = '';
			} else if (this.selectedItem) {
				this.selectedItem = '';
			}
			this.isOpen = false;
		} else {
			this.isOpen = true;
		}
	}

	handleNonInputClicked(event: MouseEvent) {
		if (!this.isOpen) {
			this.isOpen = true;
			this.filterInput?.nativeElement.focus();
		} else if ((event.target as HTMLElement).tagName !== 'INPUT') {
			this.isOpen = false;
			this.filterInput?.nativeElement.blur();
		}
	}

	preventDefault(event: MouseEvent) {
		event.preventDefault();
	}

	onItemSelected(item: string) {
		this.selectedItem = item;
		this.isOpen = false;
	}

	deselectItemOnEsc(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			this.selectedItem = '';
			this.isOpen = false;
		}
	}

	deselectItemOnEnter(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			this.selectedItem = '';
			this.isOpen = false;
		}
	}

	clearSelection() {
		this.selectedItem = '';
	}

	selectItemOnEnter(event: KeyboardEvent, item: string) {
		if (event.key === 'Enter') {
			this.onItemSelected(item);
		}
	}

	focusFirstItemOnArrowDown(event: KeyboardEvent) {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			this.itemAnchors.first?.nativeElement?.focus();
		}
	}

	navigateListOnArrow(event: KeyboardEvent) {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			this.focusNextItem(event.target as HTMLElement);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			this.focusPreviousItem(event.target as HTMLElement);
		}
	}

	private focusNextItem(target: HTMLElement) {
		if (target.textContent) {
			this.itemAnchors.get(this.displayedItems.indexOf(target.textContent.trim()) + 1)?.nativeElement?.focus();
		}
	}

	private focusPreviousItem(target: HTMLElement) {
		if (target.textContent) {
			this.itemAnchors.get(this.displayedItems.indexOf(target.textContent.trim()) - 1)?.nativeElement?.focus();
		}
	}
}
