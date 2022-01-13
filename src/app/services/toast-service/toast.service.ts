import { Injectable } from '@angular/core';
import { getClassListFromPreset, Toast, ToastPresets } from '../../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public toasts: Toast[] = [];

  show(toast: Toast): void {
    if (toast.preset) {
      this.toasts.push({
        ...toast,
        classes: getClassListFromPreset(toast.preset),
      });
    } else {
      this.toasts.push(toast);
    }
  }

  httpError(err: any): void {
    // Standard error response from fs-service
    if (err.error && err.error.code && err.error.message) {
      this.show({
        body: `[${err.error.code}] ${err.error.message}`,
        preset: ToastPresets.ERROR,
      });
    } else {
      this.show({
        body: `${err.message}`,
        preset: ToastPresets.ERROR,
      });
    }
  }

  remove(toast: Toast): void {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  success(body: string): void {
    this.show({
      body: body,
      preset: ToastPresets.SUCCESS,
    });
  }

  error(body: string): void {
    this.show({
      body: body,
      preset: ToastPresets.ERROR,
    });
  }
}
