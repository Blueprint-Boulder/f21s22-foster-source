import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileImageUploadComponent } from './profile-image-upload.component';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ImageService } from '../../services/image-service/image.service';
import { ImageMockService } from '../../services/image-service/image.mock.service';

const MockFile = ({ name = 'file.txt', size = 1024, type = 'plain/txt', lastModified = new Date() }) => {
  const blob = new Blob(['a'.repeat(size)], { type });

  // @ts-ignore
  blob.lastModifiedDate = lastModified;

  return new File([blob], name);
};

function urltoFile(url: string, filename: string, mimeType: string) {
  return fetch(url)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], filename, { type: mimeType });
    });
}

class MockFileReader {
  public result = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6BAMAAAB6wkcOAAAACXBIWXMAABJ0AAASdAHeZh94AAAALVBMVEX///8AAAD9/f3+/v78/PzAwMDr6+vm5ubo6OikpKTy8vLd3d3z8/PCwsKfn59LkXtiAAAApUlEQVR42u3dAQ2CUBRA0VfBClawghWsYAUrWMEKVrCCFaxgBjIw3e6UcwrcfWDsA29jdqVRV1dXV1dXV1f/Vh0AAIC19qV47Y/SvErzLMXn/VByywGws/rbndW5NKfSXEqueQAAAFY4luK130pzLcVH3ncZAACA37Ll57h7ad4l76w2yqSTSSeTTiadAAAAAAAAAAAAYMv8V0hdXV1dXV1dXf1jCx5J3r37xYaYAAAAAElFTkSuQmCC`;
  public callback: (event: any) => void;
  public addEventListener(type: string, callback: (event: ProgressEvent<any>) => any) {
    this.callback = callback;
  }
  public readAsDataUrl(file: any) {
    this.callback({});
  }
}

describe('ProfileImageUploadComponent', () => {
  let component: ProfileImageUploadComponent;
  let fixture: ComponentFixture<ProfileImageUploadComponent>;

  let imageService: ImageService = new ImageMockService();

  let imageControl: AbstractControl;
  let fileInput: HTMLInputElement;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not allow user to upload a file that is not jpg or png', async () => {
    spyOn(component, 'fileChangeEvent').and.callThrough();
    spyOn(window, 'alert');

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(
      MockFile({
        name: 'test.pdf',
        type: 'application/pdf',
      })
    );
    fileInput.files = dataTransfer.files;
    fileInput.dispatchEvent(new Event('change'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.fileChangeEvent).toHaveBeenCalledTimes(0);
    expect(window.alert).toHaveBeenCalled();
  });
  it('should not allow image size of more than 5mb', async () => {
    spyOn(component, 'fileChangeEvent').and.callThrough();
    spyOn(window, 'alert');

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(
      MockFile({
        name: 'test.png',
        type: 'image/png',
        size: 1024 * 1024 * 5 + 1,
      })
    );
    fileInput.files = dataTransfer.files;
    fileInput.dispatchEvent(new Event('change'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.fileChangeEvent).toHaveBeenCalledTimes(0);
    expect(window.alert).toHaveBeenCalled();
  });
  it('should not allow images less than 250x250px', async () => {
    spyOn(component, 'fileChangeEvent').and.callThrough();
    spyOn(window, 'alert');

    const dataTransfer = new DataTransfer();

    // 11x11px file
    dataTransfer.items.add(
      await urltoFile(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAdSURBVChTY9TW1v7PQCRggtJEgVHFyGBQKGZgAAD41AGWw2joIgAAAABJRU5ErkJggg==',
        'small.png',
        'image/png'
      )
    );
    fileInput.files = dataTransfer.files;
    fileInput.dispatchEvent(new Event('change'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.fileChangeEvent).toHaveBeenCalledTimes(0);
    expect(component.imageUrl).toEqual(component.BLANK_PROFILE_URL);
  });
  it(
    'should allow a jpg',
    waitForAsync(() => {
      spyOn(component, 'fileChangeEvent');

      const fileReader = new MockFileReader();

      component.validateAndChangeFile(
        // @ts-ignore
        fileReader,
        MockFile({
          name: 'test.jpg',
          type: 'image/jpeg',
          size: 1024 * 1024,
        }),
        {}
      )({ width: 250, height: 250 });

      expect(component.imageUrl).toEqual(fileReader.result);
      expect(component.fileChangeEvent).toHaveBeenCalled();
    })
  );
  it(
    'should allow a png',
    waitForAsync(() => {
      spyOn(component, 'fileChangeEvent');

      const fileReader = new MockFileReader();

      component.validateAndChangeFile(
        // @ts-ignore
        fileReader,
        MockFile({
          name: 'test.png',
          type: 'image/png',
          size: 1024 * 1024,
        }),
        {}
      )({ width: 250, height: 250 });

      expect(component.imageUrl).toEqual(fileReader.result);
      expect(component.fileChangeEvent).toHaveBeenCalled();
    })
  );
  it(
    'should send delete requests to backend if image is changed',
    waitForAsync(async() => {
      spyOn(component, 'fileChangeEvent').and.callThrough();
      spyOn(imageService, 'deleteImage').and.callThrough();
      spyOn(window, 'alert').and.callThrough();

      const fileReader = new MockFileReader();

      // @ts-ignore
      spyOn(window, 'FileReader').and.returnValue(fileReader);
      spyOn(fileReader, 'addEventListener');
      spyOn(fileReader, 'readAsDataUrl');

      let dataTransfer = new DataTransfer();
      dataTransfer.items.add(
        await urltoFile(fileReader.result, 'test.png', 'image/png')
      );
      fileInput.files = dataTransfer.files;
      fileInput.dispatchEvent(new Event('change'));

      component.imageUuid = 'key';

      dataTransfer = new DataTransfer();
      dataTransfer.items.add(
        await urltoFile(fileReader.result, 'test.png', 'image/png')
      );
      fileInput.files = dataTransfer.files;
      fileInput.dispatchEvent(new Event('change'));

      expect(window.alert).toHaveBeenCalledTimes(0);
      expect(imageService.deleteImage).toHaveBeenCalledTimes(2);
      expect(fileReader.addEventListener).toHaveBeenCalledTimes(2);
    })
  );
  it('should send a request to backend to to upload image on submit', () => {});
  it('should emit an event after successful upload', () => {});
  it('should reset if error uploading image', () => {});
  it('should disable the button while uploading', () => {});
  it('should enable the button after failing or succeeding', () => {});
  it('cropped image being sent to server should be square', () => {});
  it('should emit on change', () => {});
});
