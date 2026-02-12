import { Component, OnInit, signal, computed } from '@angular/core';
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

  filteredCryptos = computed(() => {
    const query = this.cryptoService.searchQuery().toLowerCase();
    const list = this.cryptos();

    if (!query) return list;
    
    return list.filter(crypto => crypto.name.toLowerCase().includes(query) || crypto.symbol.toLowerCase().includes(query));
  });

  ngOnInit(): void {
    this.cryptoService.getCryptos().subscribe((data) => {
      this.cryptos.set(data);
    });
  }
}
