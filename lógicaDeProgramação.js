const recursiva = require('./funçãoRecursiva');

function getSum (n1, n2, max) {
  const lcm = recursiva.getLCM(n1, n2)();

  return () => {
    sol = 0;
    for (let i = n1; i < max; i += n1 ) sol += i;
    for (let i = n2; i < max; i += n2 ) sol += i;
    for (let i = lcm; i < max; i += lcm ) sol -= i;
    return sol;
  }
};

const solution = getSum (3, 5, 1000);

module.exports = { getSum, solution };