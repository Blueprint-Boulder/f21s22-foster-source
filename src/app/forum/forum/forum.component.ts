import { Component, Input, OnInit } from '@angular/core';
import { Reply, TopicSummary } from '../../models/forum.models';
import { ForumService } from '../../services/forum-service/forum.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { AuthService } from '../../services/auth-service/auth.service';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})
export class ForumComponent implements OnInit {
  @Input() replies: Reply[] = [
    {
      id: 1,
      body: 'Suspendisse ornare et magna a molestie. Praesent tortor nisi, imperdiet gravida felis id, imperdiet dignissim risus.\n\nAliquam erat volutpat. Pellentesque rhoncus ligula non est fringilla congue. Suspendisse potenti. Nam lobortis mollis risus',
      likes: 4,
      replyingToText: 'Proin fermentum convallis justo elementum gravida. Nam fringilla euismod eleifend',
      replyingToUsername: 'usertoreplyto',
      edited: false,
      account: {
        id: 1,
        username: 'replyguy.1',
        privilege: 'USER',
        profileId: 2,
      },
    },
    {
      id: 2,
      body: 'second this! smiley emoji.',
      likes: 102,
      edited: true,
      account: {
        id: 2,
        username: 'admin-man',
        privilege: 'ADMIN',
      },
    },
    {
      id: 1,
      body: 'Mauris in lectus nec lacus lobortis cursus. Maecenas velit neque, accumsan at lacinia sed, tincidunt a urna. Integer ex felis, lacinia et ipsum non, fermentum semper dui. Donec in eros ipsum. Curabitur id enim libero. Quisque gravida viverra tortor, a rhoncus sapien ultricies a. In ipsum lacus, placerat nec tristique sed, laoreet sit amet velit. In et risus dapibus, lobortis purus non, varius neque. Phasellus viverra libero vitae enim semper, consequat venenatis nibh dignissim. Aliquam quis laoreet arcu. Aliquam a luctus est. Proin ac congue mi. Proin volutpat consectetur justo, eu varius turpis gravida in. In sed tincidunt tortor.',
      likes: 0,
      edited: false,
      account: {
        id: 3,
        username: 'randomdude',
        privilege: 'USER',
        profileId: 3,
      },
    },
  ];
  public topics: TopicSummary[];
  public isMod = false;
  constructor(
    private forumService: ForumService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.forumService.getTopicSummaries().subscribe(
      (res) => {
        this.topics = res.topics;
      },
      (err) => {
        this.toastService.httpError(err);
      }
    );

    this.isMod = this.authService.isAtLeastMod();
  }
}
