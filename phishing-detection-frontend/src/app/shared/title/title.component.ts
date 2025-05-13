import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: false,
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {
    @Input() titleText: string = '';
    @Input() phishing : boolean = false;

    get titleStyles() {
        return {
            'font-size': '2.5rem',
            'text-align': 'center',
            'margin-bottom': '2rem',
            'color': this.phishing ? 'red' : '#00ff88',
            'text-shadow': this.phishing ? '0 0 10px rgba(255,0,0,0.3)' : '0 0 10px rgba(0, 255, 136, 0.3)'
        };
    }
}
