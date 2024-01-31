import { PercolationStats } from './percolationStats';
import * as readline from 'readline-sync';

let n = readline.questionInt('Enter a number for n: ');
let t = readline.questionInt('Enter a number for t: ');
console.time('execution time: ');
let stats = new PercolationStats(n, t);
console.timeEnd('execution time: ');
console.log(`Mean: ${stats.mean()}`);
console.log(`Standard Deviation: ${stats.stddev()}`);
console.log(
  `95% Confidence Interval: [${stats.confidenceLo()}, ${stats.confidenceHi()}]`
);
