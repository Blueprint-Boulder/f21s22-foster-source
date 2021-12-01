import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ImageService } from '../../services/image-service/image.service';
import { imageServiceProvider } from '../../services/image-service/image.service.provider';
import { FormBuilder } from '@angular/forms';
import { ImageCroppedEvent, OutputFormat } from 'ngx-image-cropper';
import { ToastService } from '../../services/toast-service/toast.service';
import { ToastPresets } from '../../models/toast.model';

@Component({
  selector: 'app-profile-image-upload',
  templateUrl: './profile-image-upload.component.html',
  styleUrls: ['./profile-image-upload.component.scss'],
  providers: [imageServiceProvider],
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

    // Delete the previously uploaded picture if there was one
    if (this.imageUuid !== '') {
      this.imageService.deleteImage(this.imageUuid);
    }

    this.imageService.uploadImage(this.profilePhotoInput.nativeElement.file).subscribe(
      (res) => {
        this.imageUploaded.emit(res);
        this.imageUuid = res;
        this.isUploading = false;
        this.imageChangedEvent = '';
        this.toastService.show({
          body: 'Image successfully uploaded',
          preset: ToastPresets.SUCCESS,
        });
      },
      (err) => {
        this.toastService.show({
          body: "Couldn't upload your image, please try again.",
          preset: ToastPresets.ERROR,
        });
        this.reset();
        this.isUploading = false;
        this.imageChangedEvent = '';
      }
    );
  }

  imageChanged(event: Event): void {
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
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        ProfileImageUploadComponent.getHeightAndWidthFromDataUrl(reader.result as string)
          .then((res: Dimensions) => {
            if (res.width > 250 && res.height > 250) {
              this.imageUrl = reader.result as string;
              this.uploadedImageType = file['type'].split('/')[1];
            } else {
              this.resetWithError('Please upload an image that is at least 250x250px.');
              return;
            }
          })
          .catch((e) => {
            this.resetWithError('Please upload an image that is at least 250x250px.');
            return;
          });
      };
    }
    this.fileChangeEvent(event);
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
}

export interface Dimensions {
  height: number;
  width: number;
}
