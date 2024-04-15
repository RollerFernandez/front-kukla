import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-more-text',
  templateUrl: './more-text.component.html',
  styleUrls: ['./more-text.component.scss']
})
export class MoreTextComponent implements AfterViewInit {
  @Input() text!: string;
  @Input() initialLines = 2;
  hide = true;
  get action(): string { return this.hide ? 'Ver más' : 'Ver menos'; };
  @ViewChild('textElement') textElement!: ElementRef;
  showButton = false;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showButton = this.textElement.nativeElement.offsetHeight < this.textElement.nativeElement.scrollHeight;
    });
  }
}
