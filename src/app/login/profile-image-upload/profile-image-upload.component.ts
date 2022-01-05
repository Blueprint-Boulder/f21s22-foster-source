import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ImageService } from '../../services/image-service/image.service';
import { FormBuilder } from '@angular/forms';
import { ImageCroppedEvent, OutputFormat } from 'ngx-image-cropper';
import { ToastService } from '../../services/toast-service/toast.service';
import { ToastPresets } from '../../models/toast.model';

@Component({
  selector: 'app-profile-image-upload',
  templateUrl: './profile-image-upload.component.html',
  styleUrls: ['./profile-image-upload.component.scss'],
})
export class ProfileImageUploadComponent implements OnInit {
  public readonly BLANK_PROFILE_URL = 'assets/images/blank-profile-photo.jpg';

  public image: File;
  public isUploading = false;
  public imageUrl = this.BLANK_PROFILE_URL;
  public uploadedImageType: OutputFormat;
  public imageForm = this.formBuilder.group({
    img: [''],
  });
  public imageUuid = '';
  public fileChangedAfterUpload = false;

  @ViewChild('picFile')
  profilePhotoInput: ElementRef;

  @Output() imageUploaded: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    return;
  }

  uploadImage(): void {
    this.isUploading = true;
    this.fileChangedAfterUpload = false;

    const file = this.dataURLtoFile(this.imageUrl, 'profile_image');
    this.imageService.uploadImage(file).subscribe(
      (res) => {
        this.imageUploaded.emit(res.key);
        this.imageUuid = res.key;
        this.isUploading = false;
        this.imageChangedEvent = '';
        this.toastService.show({
          body: 'Image successfully uploaded',
          preset: ToastPresets.SUCCESS,
        });
      },
      (err) => {
        this.toastService.httpError(err);
        this.reset();
        this.isUploading = false;
        this.imageChangedEvent = '';
      }
    );
  }

  imageChanged(event: Event): void {
    // Delete the previously uploaded image, if there is one
    if (this.imageUuid !== '') {
      this.imageService.deleteImage(`${this.imageUuid}_small`).subscribe();
      this.imageService.deleteImage(`${this.imageUuid}_large`).subscribe();
    }

    if (event.target && (event.target as any).files) {
      const file = (event.target as any).files[0];

      if (!ProfileImageUploadComponent.validateType(file)) {
        this.resetWithError('Invalid image type. Please upload a png or jpeg.');
        return;
      }
      if (!ProfileImageUploadComponent.validateSize(file)) {
        this.resetWithError('Please upload an image that is less than 5mb.');
        return;
      }

      this.fileChangedAfterUpload = true;

      this.image = file;
      const reader = new FileReader();
      reader.addEventListener('load', this.readerOnLoad(reader, file));
      reader.readAsDataURL(file);
    }
  }

  private readerOnLoad(reader: FileReader, file: File): (event: ProgressEvent<FileReader>) => void {
    return (event: ProgressEvent<FileReader>) => {
      ProfileImageUploadComponent.getHeightAndWidthFromDataUrl(reader.result as string)
        .then(this.validateAndChangeFile(reader, file, event))
        .catch((e) => {
          this.resetWithError('Please upload an image that is at least 250x250px.');
        });
    };
  }

  public validateAndChangeFile(
    reader: FileReader,
    file: File,
    event: ProgressEvent<FileReader>
  ): (res: Dimensions) => void {
    return (res: Dimensions) => {
      if (res.width >= 250 && res.height >= 250) {
        this.imageUrl = reader.result as string;
        this.uploadedImageType = file['type'].split('/')[1] as OutputFormat;
        this.fileChangeEvent(event);
      } else {
        this.resetWithError('Please upload an image that is at least 250x250px.');
      }
    };
  }

  private resetWithError(error: string): void {
    alert(error);
    this.reset();
  }

  private reset(): void {
    this.imageUrl = this.BLANK_PROFILE_URL;
    this.profilePhotoInput.nativeElement.value = '';
    this.imageUploaded.emit('');
    this.imageChangedEvent = '';
  }

  private static validateType(file: File): boolean {
    const acceptedImageTypes = ['image/jpeg', 'image/png'];
    return file && acceptedImageTypes.includes(file['type']);
  }

  private static validateSize(file: File): boolean {
    return ProfileImageUploadComponent.bytesToMb(file.size) <= 5;
  }

  private static bytesToMb(bytes: number): number {
    return bytes / 1024 / 1024;
  }

  private static getHeightAndWidthFromDataUrl = (dataURL: string) =>
    new Promise<Dimensions>((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          height: img.height,
          width: img.width,
        } as Dimensions);
      };
      img.src = dataURL;
    });

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    if (event.base64) {
      this.imageUrl = event.base64;
    }
  }

  dataURLtoFile(dataurl: string, filename: string) {
    const arr = dataurl.split(',');

    const bstr = atob(arr[1]);
    let n = bstr.length;

    const mime = arr[0].match(/:(.*?);/)![1],
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
}

export interface Dimensions {
  height: number;
  width: number;
}
