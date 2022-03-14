import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum-service/forum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../services/toast-service/toast.service';
import { TopicSummary, UpdateTopicReq } from '../../models/forum.models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.scss'],
})
export class EditTopicComponent implements OnInit {
  public topic: TopicSummary;
  public editForm: FormGroup;
  public submittingForm = false;
  public exampleTopic: TopicSummary;

  constructor(
    private forumService: ForumService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const topicId = params['id'];
      if (!topicId) {
        this.toastService.error('Must provide valid id parameter in route.');
        return;
      }
      this.forumService.getTopicSummaryById(topicId).subscribe((ts) => {
        this.topic = ts;
        this.editForm = this.formBuilder.group({
          title: ts.title,
          description: ts.description,
        });

        this.exampleTopic = {
          id: 1,
          title: ts.title,
          description: ts.description,
          threadCount: 321,
          lastPostDate: new Date(),
        };

        this.editForm.get('title')!.valueChanges.subscribe((newVal) => {
          this.exampleTopic.title = newVal;
        });

        this.editForm.get('description')!.valueChanges.subscribe((newVal) => {
          this.exampleTopic.description = newVal;
        });
      }, this.toastService.httpError);
    });
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.submittingForm = true;

    const req: UpdateTopicReq = {
      id: this.topic.id,
      title:
        this.editForm.get('title')!.value !== this.topic.title &&
        this.editForm.get('title')!.value !== null &&
        this.editForm.get('title')!.value !== undefined
          ? this.editForm.get('title')!.value
          : undefined,
      description:
        this.editForm.get('description')!.value !== this.topic.description &&
        this.editForm.get('description')!.value !== null &&
        this.editForm.get('description')!.value !== undefined
          ? this.editForm.get('description')!.value
          : undefined,
    };

    if (req.title === undefined && req.description === undefined) {
      this.toastService.info('No changes detected, topic not updated.');
      this.submittingForm = false;
      return;
    }

    this.forumService.updateTopic(req).subscribe(
      (res) => {
        this.toastService.successAndNavigate('Topic successfully updated.', '/forum');
      },
      (err) => {
        this.toastService.httpError(err);
        this.submittingForm = false;
      }
    );
  }
}
