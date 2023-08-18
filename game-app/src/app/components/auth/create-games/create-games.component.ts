import { Component } from '@angular/core';
import { AdminGamesService } from '../admin-games.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Game } from 'src/app/common/game';

@Component({
  selector: 'app-create-games',
  templateUrl: './create-games.component.html',
  styleUrls: ['./create-games.component.css']
})
export class CreateGamesComponent {
  enteredContent = '';
  enteredTitle = '';
  private mode = 'create';
  private postId: string;
  game: Game;
  isLoading = false;

  

  


  constructor(private _adminGamesService: AdminGamesService,
    public route: ActivatedRoute) {
  }

  onSaveGame(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this._adminGamesService.addGame(form.value.title, form.value.description, form.value.pgRating,  form.value.price, form.value.imageUrl);
    } else {
      this._adminGamesService.updateGame(this.postId, form.value.title, form.value.description, form.value.pgRating,  form.value.price, form.value.imageUrl)
    }

    form.resetForm();
  }
}
