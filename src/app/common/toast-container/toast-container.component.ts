import { Component, HostBinding, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from '../../services/toast-service/toast.service';
import { Toast } from '../../models/toast.model';

@Component({
  selector: 'app-toasts',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
})
export class ToastContainerComponent {
  @HostBinding('[class.ngb-toasts]')
  public t = true;
  constructor(public toastService: ToastService) {}
}
