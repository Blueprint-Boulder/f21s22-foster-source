import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum-service/forum.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ThreadSummary, TopicSummary } from '../../models/forum.models';
import { FullProfileRes } from '../../models/get-profile-by-id.models';

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic-page.component.html',
  styleUrls: ['./topic-page.component.scss'],
})
export class TopicPageComponent implements OnInit {
  public topic: TopicSummary;
  public threads: ThreadSummary[];
  public id: number;
  public totalResults: number;

  // TODO: WILL DELETE THIS
  public testThreadForThreadSummaryComponent: ThreadSummary;
  public readonly THREAD_LIMIT = 25;
  public resultPage = 0;

  constructor(
    private forumService: ForumService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      // console.log(id)
      this.forumService.getTopicSummaryById(id).subscribe((topic: TopicSummary) => {
        this.topic = topic;
        // console.log(topic);
      });
      this.route.queryParamMap.subscribe(
        (map) => {
          const replyOffset = map.get('replyOffset');
          if (replyOffset !== null && !isNaN(parseInt(replyOffset))) {
            this.resultPage = parseInt((parseInt(replyOffset) / this.THREAD_LIMIT).toString()) + 1;
          }
          this.forumService
            .getThreadsForTopic(
              id,
              this.THREAD_LIMIT,
              replyOffset === null ? 0 : isNaN(parseInt(replyOffset)) ? 0 : parseInt(replyOffset)
            )
            .subscribe((res) => {
              this.threads = res.threads;
              this.totalResults = res.totalResults;
            });
        },
        (err) => {
          this.toastService.httpError(err);
          if (err?.error?.code === 404) {
            this.router.navigate(['/not-found']);
          }
        }
      );
    });
  }
  changePage(newPage: number): void {
    this.router.navigate([`/forum/topics/${this.topic.id}`], {
      queryParams: { replyOffset: (newPage - 1) * this.THREAD_LIMIT },
    });
    this.scrollToTop();
  }
  private scrollToTop(): void {
    (function smoothScroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothScroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }
}
