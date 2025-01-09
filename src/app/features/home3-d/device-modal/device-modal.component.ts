import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Device } from '../../../shared/Device';

@Component({
  selector: 'app-device-modal',
  standalone: true,
  imports: [],
  templateUrl: './device-modal.component.html',
  styleUrl: './device-modal.component.css'
})
export class DeviceModalComponent {
  @Input() device: Device | null = null;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
