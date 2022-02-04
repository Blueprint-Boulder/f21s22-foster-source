import { getClassListFromPreset, Toast, ToastPresets } from '../../models/toast.model';
import { Injectable } from '@angular/core';

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

  httpError(err: any) {
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

  remove(toast: Toast) {
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

  info(body: string): void {
    this.show({
      body: body,
      preset: ToastPresets.REGULAR,
    });
  }
}
