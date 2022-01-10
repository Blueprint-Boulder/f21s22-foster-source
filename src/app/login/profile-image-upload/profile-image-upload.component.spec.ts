import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileImageUploadComponent } from './profile-image-upload.component';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ImageService } from '../../services/image-service/image.service';
import { ImageMockService } from '../../services/image-service/image.mock.service';
import { of, throwError } from 'rxjs';
import { ImageUtils } from '../../common/utils/ImageUtils';
import { validPngUrl } from '../../common/utils/ImageUtils.spec';

describe('ProfileImageUploadComponent', () => {
  let component: ProfileImageUploadComponent;
  let fixture: ComponentFixture<ProfileImageUploadComponent>;

  let imageService: ImageService = new ImageMockService();

  let imageControl: AbstractControl;
  let fileInput: HTMLInputElement;
  let uploadButton: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileImageUploadComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: ImageService, useValue: imageService }],
    }).compileComponents();
    imageService = TestBed.inject(ImageService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    imageControl = component.imageForm.get('img') as AbstractControl;

    fileInput = fixture.debugElement.nativeElement.querySelector('input[type=file]');
    uploadButton = fixture.debugElement.nativeElement.querySelector('.upload-button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('upload button should be disabled on load', async () => {
    expect(uploadButton.getAttribute('disabled')).toEqual('');
  });
  it('after choosing file, crop window should be loaded and upload button enabled', async (done) => {
    spyOn(imageService, 'deleteImage').and.callThrough();
    spyOn(ImageUtils, 'validateImage').and.returnValue(Promise.resolve(undefined));
    spyOn(ImageUtils, 'getDataUrlFromFile').and.returnValue(Promise.resolve(''));
    spyOn(component, 'fileChangeEvent').and.callFake((event) => {
      component.imageChangedEvent = 'a';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(uploadButton.getAttribute('disabled')).toBeFalsy();
        expect(fixture.debugElement.nativeElement.querySelector('image-cropper')).toBeTruthy();
        expect(imageService.deleteImage).toHaveBeenCalledTimes(0);
        done();
      });
    });

    const files = new DataTransfer();
    files.items.add(ImageUtils.dataUrlToImageFile(validPngUrl, 'image.png'));
    fileInput.files = files.files;
    fileInput.dispatchEvent(new Event('change'));
  });
  it('when user chooses new file, should call delete on backend and open crop window + enable submit', async (done) => {
    let timesRun = 0;
    spyOn(imageService, 'deleteImage').and.callThrough();
    spyOn(ImageUtils, 'validateImage').and.returnValue(Promise.resolve(undefined));
    spyOn(ImageUtils, 'getDataUrlFromFile').and.returnValue(Promise.resolve(''));
    spyOn(component, 'fileChangeEvent').and.callFake((event) => {
      if (timesRun === 0) {
        component.imageChangedEvent = 'a';
        component.imageUuid = '11';
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          timesRun++;
          const files = new DataTransfer();
          files.items.add(ImageUtils.dataUrlToImageFile(validPngUrl, 'image.png'));
          fileInput.files = files.files;
          fileInput.dispatchEvent(new Event('change'));
        });
      } else {
        component.imageChangedEvent = 'a';
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(uploadButton.getAttribute('disabled')).toBeFalsy();
          expect(fixture.debugElement.nativeElement.querySelector('image-cropper')).toBeTruthy();
          done();
        });
      }
    });

    const files = new DataTransfer();
    files.items.add(ImageUtils.dataUrlToImageFile(validPngUrl, 'image.png'));
    fileInput.files = files.files;
    fileInput.dispatchEvent(new Event('change'));
  });
  it('if user chooses new file before uploading, should not call backend delete', async (done) => {
    let timesRun = 0;
    spyOn(imageService, 'deleteImage').and.callThrough();
    spyOn(ImageUtils, 'validateImage').and.returnValue(Promise.resolve(undefined));
    spyOn(ImageUtils, 'getDataUrlFromFile').and.returnValue(Promise.resolve(''));
    spyOn(component, 'fileChangeEvent').and.callFake((event) => {
      if (timesRun === 0) {
        component.imageChangedEvent = 'a';
        component.imageUuid = '11';
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          timesRun++;
          const files = new DataTransfer();
          files.items.add(ImageUtils.dataUrlToImageFile(validPngUrl, 'image.png'));
          fileInput.files = files.files;
          fileInput.dispatchEvent(new Event('change'));
        });
      } else {
        component.imageChangedEvent = 'a';
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(uploadButton.getAttribute('disabled')).toBeFalsy();
          expect(fixture.debugElement.nativeElement.querySelector('image-cropper')).toBeTruthy();
          done();
        });
      }
    });

    const files = new DataTransfer();
    files.items.add(ImageUtils.dataUrlToImageFile(validPngUrl, 'image.png'));
    fileInput.files = files.files;
    fileInput.dispatchEvent(new Event('change'));
  });
  it('should emit uuid on successful upload', async () => {
    spyOn(ImageUtils, 'dataUrlToImageFile').and.returnValue(
      await ImageUtils.dataUrlToImageFile(validPngUrl, 'test.png')
    );
    spyOn(imageService, 'uploadImage').and.callThrough();
    spyOn(component.imageUploaded, 'emit').and.callThrough();
    component.uploadImage();
    expect(component.imageUploaded.emit).toHaveBeenCalledOnceWith('FAKE_IMAGE_KEY');
  });
});
