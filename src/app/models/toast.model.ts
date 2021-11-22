import { TemplateRef } from '@angular/core';

export interface Toast {
  body: string;
  preset?: ToastPresets;
  classes?: string;
  delay?: number;
}

export enum ToastPresets {
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
      classlist = 'bg-info rounded mt-2';
      break;
    default:
      classlist = 'bg-info rounded mt-2';
  }
  return classlist;
}
