import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FullProfileRes } from 'src/app/models/get-profile-by-id.models';
import { Profile } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile-service/profile.service';
import { profileServiceProvider } from 'src/app/services/profile-service/profile.service.provider';

@Component({
  selector: 'app-public-user-page-component',
  templateUrl: './public-user-page-component.component.html',
  styleUrls: ['./public-user-page-component.component.css'],
  providers: [profileServiceProvider],
})
export class PublicUserPageComponentComponent implements OnInit {
  id: number;
  private sub: any;
  public monday: any;
  public tuesday: any;
  public wednesday: any;
  public thursday: any;
  public friday: any;
  public saturday: any;
  public sunday: any;
  public selectedProfile: FullProfileRes;
  closeResult = ''; // how modal was closed
  toastService: any;
  constructor(private route: ActivatedRoute, private modalService: NgbModal, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });
    console.log('User ID: ' + String(this.id));
    this.profileService.getProfileById(this.id).subscribe((p: FullProfileRes) => {
      // console.log(p);
      // console.log('Object Type: ');
      console.log(p.respiteBackground.respiteProviderInfo?.availabilities[0].monday[0]);
      console.log(p.respiteBackground.respiteProviderInfo?.availabilities[0].friday);
      this.selectedProfile = p;
      this.monday = p.respiteBackground.respiteProviderInfo?.availabilities[0].monday;
      this.tuesday = p.respiteBackground.respiteProviderInfo?.availabilities[0].tuesday;
      this.wednesday = p.respiteBackground.respiteProviderInfo?.availabilities[0].wednesday;
      this.thursday = p.respiteBackground.respiteProviderInfo?.availabilities[0].thursday;
      this.friday = p.respiteBackground.respiteProviderInfo?.availabilities[0].friday;
      this.saturday = p.respiteBackground.respiteProviderInfo?.availabilities[0].saturday;
      this.sunday = p.respiteBackground.respiteProviderInfo?.availabilities[0].sunday;
    });
  }

  open(content: any) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        backdropClass: 'modal-background',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
