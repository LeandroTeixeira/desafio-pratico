function getPrimeDivisors(n) {
  if (n < 2) return [];
  let smallestPrimeDivisor = 2;
  const raiz = Math.sqrt(n);
  while(smallestPrimeDivisor < raiz && n % smallestPrimeDivisor !== 0) smallestPrimeDivisor ++;
  if (smallestPrimeDivisor === raiz) return [raiz, raiz];
  if (smallestPrimeDivisor > raiz) return [n];

  return [smallestPrimeDivisor, ...getPrimeDivisors(n / smallestPrimeDivisor)];
};

function toObject(array) {
  if(array.length === 0) return {};
  if (array.length === 1) return {[array[0]]: 1};
  let array1 = array.filter((e) => e === array[0]);
  let array2 = array.filter((e) => e !== array[0]);
  return {
    [array[0]]: array1.length,
    ...toObject(array2)
  };
};

function mergeObjects(obj1 = {}, obj2 = {}, obj3 = {}) {
  const keys2 = Object.keys(obj2);
  const keys3 = Object.keys(obj3);
  const obj = {...obj1};
  let keys = Object.keys(obj);

  for (let key of keys2) {
    const key1 = keys.find((k) => k === key);
    if(key1 === undefined) obj[key] = obj2[key];
    else {
      if(obj2[key] > obj[key1]) obj[key] = obj2[key];
    };
  }
  
  keys = Object.keys(obj);
  for (let key of keys3) {
    const key1 = keys.find((k) => k === key);
    if(key1 === undefined) obj[key] = obj3[key];
    else {
      if(obj3[key] > obj[key1]) obj[key] = obj3[key];
    };
  }
  return obj;
};

function getLCM(n1 = 1, n2 = 1, n3 = 1) {
  return () => {
    let primeDivisors1 = getPrimeDivisors(n1);
    primeDivisors1 = toObject(primeDivisors1);

    let primeDivisors2 = getPrimeDivisors(n2);
    primeDivisors2 = toObject(primeDivisors2);

    let primeDivisors3 = getPrimeDivisors(n3);
    primeDivisors3 = toObject(primeDivisors3);

    const primeDivisors = mergeObjects(primeDivisors1, primeDivisors2, primeDivisors3);
    const divisors = Object.keys(primeDivisors);
    let resul = 1;

    for (let divisor of divisors) resul *= Math.pow(divisor, primeDivisors[divisor]);

    return resul;

  };
};

const solution = getLCM(2, 3, 10);

module.exports = {getPrimeDivisors, toObject, mergeObjects, getLCM, solution};