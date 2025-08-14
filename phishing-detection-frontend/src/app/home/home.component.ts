import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface PredictionResult {
  is_spam: boolean;
  confidence: number;
  suspect_words?: Array<[string, number]>;
  [key: string]: any;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  emailText = '';
  emailTitle = '';
  result: PredictionResult | null = null;
  isLoading = false;
  confidence?: number;

  constructor(private http: HttpClient) {}

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  private getStyledText(text: string): string {
    if (!text) return '';
    if (!this.result || typeof this.result.is_spam === 'undefined') {
      return this.escapeHtml(text);
    }
  
    const suspectWords = this.result.suspect_words || [];
    const isSpam = Boolean(this.result.is_spam);
  
    const suspectSet = new Set(
      suspectWords.map(w => w[0].toLowerCase())
    );
  
    const styled = text
      .split(' ')
      .map(word => {
        const cleanWord = word.replace(/[.,!?;:(\")]|\s/g, '').toLowerCase();
        const safeWord = this.escapeHtml(word);
        if (suspectSet.has(cleanWord)) {
          const color = isSpam ? 'red' : '#00ff88';
          const textShadow = isSpam
            ? '0 0 10px rgba(255,0,0,0.3)'
            : '0 0 10px rgba(0,255,136,0.3)';
          return `<span style="color:${color};font-weight:bold;text-shadow:${textShadow}">${safeWord}</span>`;
        }
        return safeWord;
      })
      .join(' ');
  
    return styled;
  }

  getStyledEmailTitle(): string {
    return this.getStyledText(this.emailTitle);
  }

  getStyledEmailText(): string {
    return this.getStyledText(this.emailText);
  }

  onSubmit() {
    if (!this.emailText.trim()) return;
    this.isLoading = true;
    this.result = null;
    this.confidence = undefined;
    const formattedText = `Subject: ${this.emailTitle}. Body: ${this.emailText}`;
    this.http.post<PredictionResult>('/api/predict', { text: formattedText })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.result = response;
          this.confidence = response.confidence;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error:', error);
          this.isLoading = false;
        }
      });
  }
}
