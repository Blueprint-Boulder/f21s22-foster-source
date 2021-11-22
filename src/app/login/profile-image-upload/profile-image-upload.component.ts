import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ImageService } from '../../services/image-service/image.service';
import { imageServiceProvider } from '../../services/image-service/image.service.provider';
import { FormBuilder } from '@angular/forms';
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
    this.imageService.uploadImage(this.profilePhotoInput.nativeElement.file).subscribe(
      (res) => {
        this.imageUploaded.emit(res);
        this.isUploading = false;
      },
      (err) => {
        this.toastService.show({
          body: "Couldn't upload your image, please try again.",
          preset: ToastPresets.ERROR,
        });
        this.reset();
        this.isUploading = false;
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

      this.image = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        ProfileImageUploadComponent.getHeightAndWidthFromDataUrl(reader.result as string)
          .then((res: Dimensions) => {
            if (res.width > 250 && res.height > 250) {
              this.imageUrl = reader.result as string;
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
  }

  private resetWithError(error: string): void {
    alert(error);
    this.reset();
  }

  private reset(): void {
    this.imageUrl = this.BLANK_PROFILE_URL;
    this.profilePhotoInput.nativeElement.value = '';
    this.imageUploaded.emit('');
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
}

export interface Dimensions {
  height: number;
  width: number;
}
