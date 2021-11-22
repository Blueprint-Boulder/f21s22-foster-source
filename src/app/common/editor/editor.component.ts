import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Editor, toHTML } from 'ngx-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, OnDestroy {
  editor: Editor;
  html: '';
  wordCount = 0;
  characterCount = 0;

  @Input() characterLimit = -1;
  @Output() richTextChange: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.editor = new Editor();
    this.editor.valueChanges.subscribe((changes) => {
      const html = toHTML(changes);
      this.richTextChange.emit(html);
      this.wordCount = this.getWordCount(html);
      this.characterCount = html.length;
    });
  }

  // make sure to destroy the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  private getWordCount(s: string): number {
    return s
      .replace(/<[^>]*>?/gm, '')
      .split(' ')
      .filter(function (n) {
        return n !== '';
      }).length;
  }
}
