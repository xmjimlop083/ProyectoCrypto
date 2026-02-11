import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Crypto } from '../../services/crypto';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private cryptoService = inject(Crypto);
  private router = inject(Router);

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    const valor = input.value.trim();

    this.cryptoService.searchQuery.set(valor);

    if (this.router.url !== '/list'){
      this.router.navigate(['/list']);
    }
  }
}
