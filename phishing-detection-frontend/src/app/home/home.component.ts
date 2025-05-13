import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

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
          this.isLoading = false;
          this.confidence = this.result['confidence'];
        },
        error: (error) => {
          console.error('Error:', error);
          this.isLoading = false;
        }
      });
  }
}
