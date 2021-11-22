import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImageService } from '../../services/image-service/image.service';
import { imageServiceProvider } from '../../services/image-service/image.service.provider';

@Component({
  selector: 'app-profile-image-upload',
  templateUrl: './profile-image-upload.component.html',
  styleUrls: ['./profile-image-upload.component.scss'],
  providers: [imageServiceProvider],
})
export class ProfileImageUploadComponent implements OnInit {
  public readonly BLANK_PROFILE_URL = 'assets/images/blank-profile-photo.jpg';

  public image: File;
  public imageUrl = this.BLANK_PROFILE_URL;

  @ViewChild('picFile')
  profilePhotoInput: ElementRef;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    return;
  }

  uploadImage(): void {
    this.imageService.uploadImage(this.profilePhotoInput.nativeElement.file).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  imageChanged(event: Event): void {
    if (event.target && (event.target as any).files) {
      const file = (event.target as any).files[0];

      if (!ProfileImageUploadComponent.validateType(file)) {
        alert('Invalid image type. Please upload a png or jpeg.');
        this.imageUrl = this.BLANK_PROFILE_URL;
        this.profilePhotoInput.nativeElement.value = '';
        return;
      }
      if (!ProfileImageUploadComponent.validateSize(file)) {
        alert('Please upload an image that is less than 5mb.');
        this.imageUrl = this.BLANK_PROFILE_URL;
        this.profilePhotoInput.nativeElement.value = '';
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
              alert('Please upload an image that is at least 250x250px.');
              this.imageUrl = this.BLANK_PROFILE_URL;
              this.profilePhotoInput.nativeElement.value = '';
              return;
            }
          })
          .catch((e) => {
            alert('Please upload an image that is at least 250x250px.');
            this.imageUrl = this.BLANK_PROFILE_URL;
            this.profilePhotoInput.nativeElement.value = '';
            return;
          });
      };
    }
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
