import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/common/game';
import { GamesService } from 'src/app/services/games.service';
import { AdminGamesService } from '../admin-games.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-games-list',
  templateUrl: './admin-games-list.component.html',
  styleUrls: ['./admin-games-list.component.css']
})
export class AdminGamesListComponent {

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
