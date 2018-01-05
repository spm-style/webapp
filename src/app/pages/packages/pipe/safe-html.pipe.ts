import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  pure: false
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){}

  transform(value: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
