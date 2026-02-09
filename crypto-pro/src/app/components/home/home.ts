import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Crypto, CryptoCurrency } from '../../services/crypto';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  featuredCryptos = signal<CryptoCurrency[]>([]);

  constructor(private cryptoService: Crypto) {}

  ngOnInit(): void {
    this.cryptoService.getCryptos().subscribe({
      next: (data) => {
        this.featuredCryptos.set(data.slice(0, 3));
      },
      error: (err) => {
        console.error('Error fetching cryptos:', err);
      },
    });
  }
}
