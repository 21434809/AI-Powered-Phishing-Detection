import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  emailText: string = '';
  emailTitle: string = '';
  result: any;
  isLoading: boolean = false;
  confidence?: number;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  getStyledEmailTitle(): SafeHtml {
    if (!this.emailTitle) return '';
    // Only apply coloring after result is available (after submit)
    if (this.result === null || this.result === undefined || typeof this.result.is_spam === 'undefined') {
      return this.sanitizer.bypassSecurityTrustHtml(this.emailTitle);
    }
    // Ensure isSpam is a boolean
    const isSpam = Boolean(this.result.is_spam);
    const styled = this.emailTitle
      .split(' ')
      .map((word, idx) => {
        if (idx % 2 === 1) {
          const color = isSpam ? 'red' : 'green';
          return `<span style="color:${color}">${word}</span>`;
        }
        return word;
      })
      .join(' ');
    return this.sanitizer.bypassSecurityTrustHtml(styled);
  }
  getStyledEmailText(): SafeHtml {
    if (!this.emailText) return '';
    if (this.result === null || this.result === undefined || typeof this.result.is_spam === 'undefined') {
      return this.sanitizer.bypassSecurityTrustHtml(this.emailText);
    }
    const isSpam = Boolean(this.result.is_spam);
    const styled = this.emailText
      .split(' ')
      .map((word, idx) => {
        if (idx % 2 === 1) {
          const color = isSpam ? 'red' : 'green';
          return `<span style="color:${color}">${word}</span>`;
        }
        return word;
      })
      .join(' ');
    return this.sanitizer.bypassSecurityTrustHtml(styled);
  }
  onSubmit() {
    if (!this.emailText.trim()) return;
    
    this.isLoading = true;
    this.result = null;
    const formattedText = `Subject: ${this.emailTitle}. Body: ${this.emailText}`;
    
    this.http.post('http://127.0.0.1:5000/predict', { 
      text: formattedText
    })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.result = response;
          this.confidence = this.result['confidence'];
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error:', error);
          this.isLoading = false;
        }
      });
  }
}
