export class WQUPC {
  ids: number[];
  sz: number[];

  constructor(N: number) {
    // this.ids = Array.from(Array(N).keys())
    this.ids = [];
    this.sz = [];

    for (let i = 0; i < N; i++) {
      this.ids.push(i);
      this.sz.push(1);
    }
  }

  connected(p: number, q: number): boolean {
    return this.root(p) === this.root(q);
  }

  root(i: number) {
    let id = this.ids[i];
    while (id !== this.ids[id]) {
      this.ids[i] = this.ids[this.ids[i]];
      id = this.ids[id];
    }
    return id;
  }

  union(p: number, q: number) {
    const i = this.root(p);
    const j = this.root(q);
    if (i == j) return;
    if (this.sz[i] < this.sz[j]) {
      this.ids[i] = j;
      this.sz[j] += this.sz[i];
    } else {
      this.ids[j] = i;
      this.sz[i] += this.sz[j];
    }
  }
}
