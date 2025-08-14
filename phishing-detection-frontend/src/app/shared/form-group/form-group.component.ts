import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-group',
  standalone: false,
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css']
})
export class FormGroupComponent {
  @Input() label!: string;
  @Input() inputId!: string;
}
