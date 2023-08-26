import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Game } from '../app/common/game';
import { GamesService } from '../app/services/games.service';
import { inject } from '@angular/core';

export const gameResolver: ResolveFn<Game> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(GamesService).getGameById(route.paramMap.get('_id')!);
  };