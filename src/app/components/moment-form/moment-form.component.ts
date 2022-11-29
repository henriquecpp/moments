import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Moment } from 'src/app/interfaces/moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Moment>();
  @Input() btnText!: string

  momentForm!: FormGroup;
  //title: string;

  constructor() { }

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      image: new FormControl('', [Validators.required])
    })
  }

  get title(){
    return this.momentForm.get('title')!;
  }

  get description(){
    return this.momentForm.get('description')!;
  }

  get image(){
    return this.momentForm.get('image')!;
  }

  onFileSelected(event: Event){

    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList = element.files!;

    this.momentForm.patchValue({image: fileList.item(0)});

    console.log(this.momentForm.value);

  }

  submit(){
    if (this.momentForm.invalid)
      return;

    this.onSubmit.emit(this.momentForm.value);
  }

}
