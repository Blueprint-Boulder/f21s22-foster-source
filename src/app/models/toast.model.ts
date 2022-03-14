import { TemplateRef } from '@angular/core';

export interface Toast {
  body: string;
  preset?: ToastPresets;
  classes?: string;
  delay?: number;
}

export enum ToastPresets {
  NONE,
  REGULAR,
  SUCCESS,
  ERROR,
}

export function getClassListFromPreset(preset: ToastPresets) {
  let classlist = '';
  switch (+preset) {
    case ToastPresets.SUCCESS:
      classlist = 'bg-success text-light rounded mt-2';
      break;
    case ToastPresets.ERROR:
      classlist = 'bg-danger text-light rounded mt-2';
      break;
    case ToastPresets.REGULAR:
      classlist = 'bg-light border rounded mt-2 shadow-sm';
      break;
    default:
      classlist = 'bg-light border rounded mt-2';
      break;
  }
  return classlist;
}
