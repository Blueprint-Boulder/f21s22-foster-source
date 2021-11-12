import { Injectable } from '@angular/core';
import {
  getClassListFromPreset,
  Toast,
  ToastPresets,
} from '../../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public toasts: Toast[] = [];

  show(toast: Toast) {
    if (toast.preset) {
      this.toasts.push({
        ...toast,
        classes: getClassListFromPreset(toast.preset),
      });
    } else {
      this.toasts.push(toast);
    }
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
