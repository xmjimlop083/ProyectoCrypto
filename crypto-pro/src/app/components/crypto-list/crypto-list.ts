import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Crypto, CryptoCurrency } from '../../services/crypto';

@Component({
  selector: 'app-crypto-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './crypto-list.html',
  styleUrl: './crypto-list.css',
})
export class CryptoList implements OnInit {
  cryptos = signal<CryptoCurrency[]>([]);

  constructor(private cryptoService: Crypto) {}

  ngOnInit(): void {
    this.cryptoService.getCryptos().subscribe((data) => {
      this.cryptos.set(data);
    });
  }
}
