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
  result: any;
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (!this.emailText.trim()) return;
    
    this.isLoading = true;
    this.result = null;
    
    this.http.post('http://127.0.0.1:5000/predict', { text: this.emailText })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.result = response;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error:', error);
          this.isLoading = false;
        }
      });
  }
}
