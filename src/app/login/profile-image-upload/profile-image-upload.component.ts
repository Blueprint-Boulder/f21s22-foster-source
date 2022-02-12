import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ImageService } from '../../services/image-service/image.service';
import { FormBuilder } from '@angular/forms';
import { ImageCroppedEvent, OutputFormat } from 'ngx-image-cropper';
import { ToastService } from '../../services/toast-service/toast.service';
import { ToastPresets } from '../../models/toast.model';
import { ImageUtils } from '../../common/utils/ImageUtils';

@Component({
  selector: 'app-profile-image-upload',
  templateUrl: './profile-image-upload.component.html',
  styleUrls: ['./profile-image-upload.component.scss'],
})
export class ProfileImageUploadComponent implements OnInit {
  public readonly BLANK_PROFILE_URL = 'assets/images/blank-profile-photo.jpg';

  public image: File;
  public isUploading = false;
  public croppedImageDataUrl = this.BLANK_PROFILE_URL;
  public uploadedImageType: OutputFormat;
  public imageUuid = '';
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public imageHasBeenUploaded = false;
  public imageForm = this.formBuilder.group({
    img: [''],
  });

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
    this.imageHasBeenUploaded = true;

    const file = ImageUtils.dataUrlToImageFile(this.croppedImageDataUrl, 'profile_image');
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
        this.isUploading = false;
        this.reset();
      }
    );
  }

  async imageChanged(event: Event): Promise<void> {
    // Reset the component and delete the previously uploaded image, if there is one
    if (this.imageHasBeenUploaded) {
      this.reset();
    }

    if (event.target && (event.target as any).files) {
      const file = (event.target as any).files[0];

      try {
        const error = await ImageUtils.validateImage({ width: 250, height: 250 }, 5, file);
        if (error !== undefined) {
          return this.resetWithError(error);
        }
        this.croppedImageDataUrl = await ImageUtils.getDataUrlFromFile(file);
        this.uploadedImageType = file['type'].split('/')[1] as OutputFormat;
        this.fileChangeEvent(event);
      } catch (e) {
        this.resetWithError('Something went wrong trying to validate the file.');
        return;
      }
    }
  }

  private resetWithError(error: string): void {
    alert(error);
    this.reset();
  }

  private reset(): void {
    this.croppedImageDataUrl = this.BLANK_PROFILE_URL;
    this.profilePhotoInput.nativeElement.value = '';
    this.imageUploaded.emit('');
    this.imageChangedEvent = '';
    this.imageUuid = '';
    if (this.imageHasBeenUploaded) {
      this.imageService.deleteImage(`${this.imageUuid}_small`).subscribe();
      this.imageService.deleteImage(`${this.imageUuid}_large`).subscribe();
      this.imageHasBeenUploaded = false;
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    if (event.base64) {
      this.croppedImageDataUrl = event.base64;
    }
  }
}
