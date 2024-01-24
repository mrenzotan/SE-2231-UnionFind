import readline from "readline-sync";
import { Percolation } from "./Percolation";

console.log("hi!");

let N = readline.questionInt("Grids: ");
let numSamples = readline.questionInt("How many samples: ");

function Percolates(N: number) {
  var perc = new Percolation(N);
  var count = 0; // Should output to screen when simulation is finished

  // Open a site uniformly at random within the grid
  function openRandom() {
    // Generate random integers between 1 and N
    var i = Math.floor(Math.random() * N + 1);
    var j = Math.floor(Math.random() * N + 1);

    if (perc.isOpen(i, j)) {
      openRandom();
    } else {
      perc.open(i, j);
      return;
    }
  }
}
