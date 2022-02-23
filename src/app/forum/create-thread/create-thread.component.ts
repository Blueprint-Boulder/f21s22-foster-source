import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum-service/forum.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateNewThreadReq, TopicSummary } from '../../models/forum.models';

@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.scss'],
})
export class CreateThreadComponent implements OnInit {
  public topics: TopicSummary[];
  public topicId: number | undefined;
  public threadTitle = '';
  public threadBody = '';
  public submittingForm = false;

  constructor(
    private forumService: ForumService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.forumService.getTopicSummaries().subscribe(
      (ts) => {
        this.topics = ts.topics;
        this.route.queryParamMap.subscribe((map) => {
          const requestedTopic = map.get('topic');

          if (!requestedTopic || isNaN(parseInt(requestedTopic))) {
            return;
          }

          if (this.topics.find((t) => t.id === parseInt(requestedTopic))) {
            this.topicId = parseInt(requestedTopic);
          }
        });
      },
      (err) => {
        this.toastService.httpError(err);
      }
    );
  }

  bodyChange(text: string): void {
    this.threadBody = text;
  }

  onSubmit(): void {
    if (this.formIsInvalid()) {
      this.toastService.error('Form is invalid. Please fill out all required fields.');
      return;
    }

    this.submittingForm = true;

    const req: CreateNewThreadReq = {
      topicId: this.topicId as number,
      title: this.threadTitle,
      body: this.threadBody,
    };

    this.forumService.createNewThread(req).subscribe(
      (res) => {
        this.toastService.success('Successfully posted your thread.');
        this.router.navigate([`/forum/threads/${res.id}`]);
      },
      (err) => {
        this.toastService.httpError(err);
        this.submittingForm = false;
      }
    );
  }

  formIsInvalid(): boolean {
    return !this.threadTitle || this.threadTitle === '' || !this.threadBody || this.threadBody === '' || !this.topicId;
  }

  changeTopic(value: any) {
    console.log(this.topicId);
  }
}
