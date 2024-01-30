import { WQUPC } from './WQUPC';

export class Percolation {
  private size: number;
  private top: number;
  private bottom: number;
  private uf: WQUPC;
  opened: boolean[];
  sitesOpened: number;

  constructor(n: number) {
    this.size = n;
    this.top = 0;
    this.bottom = this.size * this.size + 1;
    this.uf = new WQUPC(n * n + 2);
    this.opened = Array(n * n).fill(false);
    this.sitesOpened = 0;
  }

  private xyTo1D(row: number, col: number): number {
    return this.size * (row - 1) + col;
  }

  open(row: number, col: number): void {
    if (this.isOpen(row, col)) {
      return;
    }

    this.opened[this.xyTo1D(row, col)] = true;

    if (row === 1) {
      this.uf.union(this.xyTo1D(row, col), this.top);
    }
    if (row === this.size) {
      this.uf.union(this.xyTo1D(row, col), this.bottom);
    }
    if (row > 1 && this.isOpen(row - 1, col)) {
      this.uf.union(this.xyTo1D(row, col), this.xyTo1D(row - 1, col));
    }
    if (row < this.size && this.isOpen(row + 1, col)) {
      this.uf.union(this.xyTo1D(row, col), this.xyTo1D(row + 1, col));
    }
    if (col > 1 && this.isOpen(row, col - 1)) {
      this.uf.union(this.xyTo1D(row, col), this.xyTo1D(row, col - 1));
    }
    if (col < this.size && this.isOpen(row, col + 1)) {
      this.uf.union(this.xyTo1D(row, col), this.xyTo1D(row, col + 1));
    }

    ++this.sitesOpened;
  }

  openRandom(): void {
    let row, col;
    do {
      row = Math.floor(Math.random() * this.size + 1);
      col = Math.floor(Math.random() * this.size + 1);
    } while (this.isOpen(row, col));
    this.open(row, col);
  }

  isOpen(row: number, col: number): boolean {
    return this.opened[this.xyTo1D(row, col)];
  }

  isFull(row: number, col: number): boolean {
    return this.uf.connected(this.xyTo1D(row, col), this.top);
  }

  percolates(): boolean {
    return this.uf.connected(this.top, this.bottom);
  }

  numberOfOpenSites(): number {
    return this.sitesOpened;
  }

  gridVisualizer(): string {
    let grid: string = '';

    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.isOpen(row, col) && this.isFull(row, col)) {
          grid += ' ✔ ';
        } else if (this.isOpen(row, col)) {
          grid += '⭕ ';
        } else {
          grid += '❌ ';
        }
      }
      grid += '\n';
    }

    return grid;
  }
}
