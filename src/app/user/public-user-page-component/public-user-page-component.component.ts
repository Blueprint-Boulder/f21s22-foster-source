import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbAccordionConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FullProfileRes } from 'src/app/models/get-profile-by-id.models';
import { Profile } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile-service/profile.service';
import { profileServiceProvider } from 'src/app/services/profile-service/profile.service.provider';
import { ToastService } from '../../services/toast-service/toast.service';

@Component({
  selector: 'app-public-user-page-component',
  templateUrl: './public-user-page-component.component.html',
  styleUrls: ['./public-user-page-component.component.css'],
  providers: [profileServiceProvider],
})
export class PublicUserPageComponentComponent implements OnInit {
  id: number;
  private sub: any;
  public selectedProfile: FullProfileRes;
  closeResult = ''; // how modal was closed
  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private profileService: ProfileService,
    config: NgbAccordionConfig
  ) {
    config.closeOthers = true;
    config.type = 'light';
  }

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
    });
  }

  returnAge(birthday: Date) {
    const now = new Date().getFullYear();
    return now - birthday.getFullYear();
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
