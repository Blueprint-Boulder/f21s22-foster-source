import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image-service/image.service';
import { imageServiceProvider } from '../services/image-service/image.service.provider';

@Component({
  selector: 'app-image-service-test',
  templateUrl: './image-service-test.component.html',
  styleUrls: ['./image-service-test.component.scss'],
  providers: [imageServiceProvider],
})
export class ImageServiceTestComponent implements OnInit {
  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    return;
  }
}
