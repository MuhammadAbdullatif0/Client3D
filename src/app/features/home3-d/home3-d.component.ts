import { Component, OnInit } from '@angular/core';
import { Device } from '../../shared/Device';
import { HomeService } from '../../core/home.service';
import { DeviceModalComponent } from './device-modal/device-modal.component';

@Component({
  selector: 'app-home3-d',
  standalone: true,
  imports: [DeviceModalComponent],
  templateUrl: './home3-d.component.html',
  styleUrl: './home3-d.component.css'
})
export class Home3DComponent implements OnInit {
  devices: Device[] = [];
  selectedDevice: Device | null = null;

  private homeImage = new Image();
  private camImage = new Image();
  private doorImage = new Image();

  constructor(private deviceService: HomeService) {}

  ngOnInit(): void {
    const canvas = document.getElementById('homeCanvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    if (!context) return;

    this.homeImage.src = 'assets/images/Home.png';
    this.camImage.src = 'assets/images/cam.png';
    this.doorImage.src = 'assets/images/door.png';

    this.homeImage.onload = () => {
      this.resizeCanvas(canvas, context);
      this.loadDevices(context);
    };

    window.addEventListener('resize', () => {
      this.resizeCanvas(canvas, context);
      this.loadDevices(context);
    });

    canvas.addEventListener('click', (event) => this.onCanvasClick(event, canvas));
  }

  resizeCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.drawImage(this.homeImage, 0, 0, canvas.width, canvas.height);
  }

  loadDevices(context: CanvasRenderingContext2D): void {
    this.deviceService.getDevices().subscribe((devices: Device[]) => {
      this.devices = devices;

      devices.forEach((device) => {
        const x = this.convertLongitudeToX(device.longitude, context.canvas.width);
        const y = this.convertLatitudeToY(device.latitude, context.canvas.height);

        const img = device.type.toLowerCase() === 'camera' ? this.camImage : this.doorImage;
        context.drawImage(img, x - 10, y - 10, 20, 20);
      });
    });
  }

  onCanvasClick(event: MouseEvent, canvas: HTMLCanvasElement): void {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    this.devices.forEach((device) => {
      const x = this.convertLongitudeToX(device.longitude, canvas.width);
      const y = this.convertLatitudeToY(device.latitude, canvas.height);

      if (Math.abs(clickX - x) < 10 && Math.abs(clickY - y) < 10) {
        if (this.selectedDevice === device) {
          return;
        }
        this.selectedDevice = device;
      }
    });
  }

  closeModal(): void {
    this.selectedDevice = null;
  }

  convertLongitudeToX(longitude: number, canvasWidth: number): number {
    return (longitude + 180) * (canvasWidth / 360);
  }

  convertLatitudeToY(latitude: number, canvasHeight: number): number {
    return (90 - latitude) * (canvasHeight / 180);
  }
}
