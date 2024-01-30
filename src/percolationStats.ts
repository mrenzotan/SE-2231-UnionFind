import { Percolation } from './percolation';

export class PercolationStats {
  private trials: number;
  private thresholds: number[];

  constructor(n: number, trials: number) {
    if (n <= 0 || trials <= 0) {
      throw new Error('Given N <= 0 || Trials <= 0');
    }

    this.trials = trials;
    this.thresholds = [];

    for (let i = 0; i < this.trials; i++) {
      const percolation = new Percolation(n);
      let sitesOpened = 0;

      while (!percolation.percolates()) {
        percolation.openRandom();
        sitesOpened++;
      }

      // console.log(percolation.opened, 'grids');

      console.log(`Exp No. ${i + 1}`);
      console.log(percolation.gridVisualizer());
      console.log(`Sites opened: ${sitesOpened}\n`);

      this.thresholds.push(sitesOpened / (n * n));
    }
  }

  mean(): number {
    return (
      this.thresholds.reduce((sum, current) => sum + current, 0) /
      this.thresholds.length
    );
  }

  stddev(): number {
    const mean = this.mean();
    return Math.sqrt(
      this.thresholds
        .map((num) => Math.pow(num - mean, 2))
        .reduce((sum, current) => sum + current, 0) / this.thresholds.length
    );
  }

  confidenceLo(): number {
    return this.mean() - (1.96 * this.stddev()) / Math.sqrt(this.trials);
  }

  confidenceHi(): number {
    return this.mean() + (1.96 * this.stddev()) / Math.sqrt(this.trials);
  }
}
