import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { Crypto } from '../../services/crypto';

@Component({
  selector: 'app-crypto-detail',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, RouterLink],
  templateUrl: './crypto-detail.html',
  styleUrl: './crypto-detail.css',
})
export class CryptoDetail implements OnInit {
  crypto = signal<any>(null);
  loading = signal<boolean>(true);

  public chartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };

  public chartOptions: ChartOptions = {
    responsive: true,
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

  public chartType: ChartType = 'line';

  constructor(
    private route: ActivatedRoute,
    private cryptoService: Crypto
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cryptoService.getCryptoDetail(id).subscribe({
        next: (data) => {
          console.log('Data received:', data);
          this.setupChart(data);
          this.crypto.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error loading crypto detail:', err);
          this.loading.set(false);
        }
      });
    } else {
      this.loading.set(false);
    }
  }

  private setupChart(data: any): void {
    if (!data.market_data || !data.market_data.sparkline_7d) {
      console.warn('No sparkline data available');
      return;
    }

    const prices = data.market_data.sparkline_7d.price;
    // Comparamos el último precio con el primero para determinar el color
    const startPrice = prices[0];
    const endPrice = prices[prices.length - 1];
    const isPositive = endPrice >= startPrice;

    // Verde si subió, Rojo si bajó
    const lineColor = isPositive ? '#198754' : '#dc3545'; // Colores Bootstrap success/danger

    this.chartData = {
      datasets: [
        {
          data: prices,
          label: 'Evolución 7 días',
          borderColor: lineColor,
          backgroundColor: isPositive ? 'rgba(25, 135, 84, 0.1)' : 'rgba(220, 53, 69, 0.1)',
          pointRadius: 0,
          borderWidth: 2,
          fill: true,
        },
      ],
      labels: new Array(prices.length).fill(''),
    };
  }
}
