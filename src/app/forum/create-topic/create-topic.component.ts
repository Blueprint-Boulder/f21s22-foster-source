import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateTopicReq, TopicSummary } from '../../models/forum.models';
import { ForumService } from '../../services/forum-service/forum.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast-service/toast.service';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss'],
})
export class CreateTopicComponent implements OnInit {
  public topicForm: FormGroup;
  public submittingForm: boolean;
  public exampleTopic: TopicSummary = {
    id: 1,
    title: 'The Title of Your Topic',
    description: 'Your topic description will go here',
    threadCount: 321,
    lastPostDate: new Date(),
  };

  constructor(
    private formBuilder: FormBuilder,
    private forumService: ForumService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.topicForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
    });

    this.topicForm.get('title')!.valueChanges.subscribe((newVal) => {
      this.exampleTopic.title = newVal;
    });

    this.topicForm.get('description')!.valueChanges.subscribe((newVal) => {
      this.exampleTopic.description = newVal;
    });
  }

  onSubmit(): void {
    if (this.topicForm.invalid) {
      this.topicForm.markAllAsTouched();
      return;
    }
    this.submittingForm = true;

    const req: CreateTopicReq = {
      title: this.topicForm.get('title')!.value,
      description: this.topicForm.get('description')!.value,
    };

    this.forumService.createTopic(req).subscribe(
      (res) => {
        this.toastService.successAndNavigate('Successfully created a new forum topic.', '/forum');
      },
      (err) => {
        this.toastService.httpError(err);
        this.submittingForm = false;
      }
    );
  }
}
