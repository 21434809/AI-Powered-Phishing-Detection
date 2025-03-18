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

  constructor(private http: HttpClient) {}
  onSubmit() {
    this.http.post('http://127.0.0.1:5000/predict', { text: this.emailText })
      .subscribe(response => {
        console.log(response);
        this.result = response;
      });
  }
}
