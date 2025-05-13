import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: false,
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {
    @Input() titleText: string = '';
}
