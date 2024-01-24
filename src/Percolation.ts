import { WeightedQuickUnion } from "./weightedQuickUnionUF";

export class Percolation {
  size: number;
  uf: WeightedQuickUnion;
  topUF: WeightedQuickUnion;
  opened: number[];

  constructor(N: number) {
    this.size = N;
    this.opened = [];
    this.uf = new WeightedQuickUnion(N * N + 2);
    this.topUF = new WeightedQuickUnion(N * N + 2);

    for (let i = 0; i < N * N; i++) {
      this.opened[i] = 0;
    }
  }

  xyTo1D(row: number, col: number) {
    return this.size * (row - 1) + col;
  }

  open(row: number, col: number) {
    // Mark open in boolean array:y
    this.opened[this.xyTo1D(row, col)] = 1;

    // Connect with open neighbors:
    if (row != 1 && this.isOpen(row - 1, col)) {
      this.uf.union(this.xyTo1D(row, col), this.xyTo1D(row - 1, col));
      this.topUF.union(this.xyTo1D(row, col), this.xyTo1D(row - 1, col));
    }
    if (row != this.size && this.isOpen(row + 1, col)) {
      this.uf.union(this.xyTo1D(row, col), this.xyTo1D(row + 1, col));
      this.topUF.union(this.xyTo1D(row, col), this.xyTo1D(row + 1, col));
    }
    if (col != 1 && this.isOpen(row, col - 1)) {
      this.uf.union(this.xyTo1D(row, col), this.xyTo1D(row, col - 1));
      this.topUF.union(this.xyTo1D(row, col), this.xyTo1D(row, col - 1));
    }
    if (col != this.size && this.isOpen(row, col + 1)) {
      this.uf.union(this.xyTo1D(row, col), this.xyTo1D(row, col + 1));
      this.topUF.union(this.xyTo1D(row, col), this.xyTo1D(row, col + 1));
    }

    // If in top or bottom row, connect to virtual sites:
    if (row === 1) {
      this.uf.union(this.xyTo1D(row, col), 0);
      this.topUF.union(this.xyTo1D(row, col), 0);
    }
    if (row === this.size) {
      // Don't connect topUF.  Prevents backwash problem
      this.uf.union(this.xyTo1D(row, col), this.size * this.size + 1);
    }
  }

  isOpen(row: number, col: number) {
    return this.opened[this.xyTo1D(row, col)];
  }

  isFull(row: number, col: number): boolean {
    return this.topUF.connected(this.xyTo1D(row, col), 0);
  }

  percolates() {
    return this.uf.connected(0, this.size * this.size + 1);
  }
}
