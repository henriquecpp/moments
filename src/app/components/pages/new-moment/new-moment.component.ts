import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Moment } from 'src/app/interfaces/moment';
import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {
  btnText = "Compartilhar"

  constructor(private momentService: MomentService,
    private messagesService: MessagesService,
    private router: Router,
    private titleService: Title
  ) { this.titleService.setTitle("New Moment"); }

  ngOnInit(): void {
  }

  async createHandler(moment: any){
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.descriptin);
    formData.append('iamge', moment.image);

    await this.momentService.createMoment(formData).subscribe();

    this.messagesService.add("Adicionado com sucesso!");

    this.router.navigate(['/']);
  }

}
