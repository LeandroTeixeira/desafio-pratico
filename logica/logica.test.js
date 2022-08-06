const recursiva = require('./funçãoRecursiva');
const soma = require('./lógicaDeProgramação');

describe("Desafios Lógica de Programação", () => {
  it("Testando getPrimeDivisor", () => {
    expect(recursiva.getPrimeDivisors(1)).toEqual([]);
    expect(recursiva.getPrimeDivisors(2)).toEqual([2]);
    expect(recursiva.getPrimeDivisors(4)).toEqual([2, 2]);
    expect(recursiva.getPrimeDivisors(5)).toEqual([5]);
    expect(recursiva.getPrimeDivisors(6)).toEqual([2, 3]);
    expect(recursiva.getPrimeDivisors(7)).toEqual([7]);
    expect(recursiva.getPrimeDivisors(8)).toEqual([2, 2, 2]);
    expect(recursiva.getPrimeDivisors(9)).toEqual([3, 3]);
    expect(recursiva.getPrimeDivisors(10)).toEqual([2, 5]);

    expect(recursiva.getPrimeDivisors(49)).toEqual([7, 7]);
    expect(recursiva.getPrimeDivisors(53)).toEqual([53]);

  });

  it("Testando toObject", () => {
    expect(recursiva.toObject([])).toEqual({});
    expect(recursiva.toObject([2])).toEqual({2: 1});
    expect(recursiva.toObject([2, 3])).toEqual({2: 1, 3: 1});
    expect(recursiva.toObject([2, 3, 2, 3, 2, 3, 3, 2, 2, 5, 5, 5])).toEqual({2: 5, 3: 4, 5: 3});
  });

  it("Testando mergeObjects", () => {
    expect(recursiva.mergeObjects({})).toEqual({});
    expect(recursiva.mergeObjects(
      { 2: 1 }, 
      { 3: 2 }, 
      { 5: 1 })
    ).toEqual(
      { 2: 1, 3: 2, 5: 1 }
    );

    expect(recursiva.mergeObjects(
      { 2: 1, 3: 5, 5: 2, 7: 1, 11: 2 }, 
      { 2: 3, 3: 1, 5: 4, 7: 2, 13: 2 }, 
      { 2: 4, 3: 1, 5: 2, 7: 6, 17: 1 }
    )).toEqual(
      { 2: 4, 3: 5, 5: 4, 7: 6, 11: 2, 13: 2, 17: 1}
    );

  });

  it("Testing getLCM", () => {
    expect(recursiva.getLCM(12, 15, 75)()).toBe(300);
    expect(recursiva.getLCM(2, 3, 10)()).toBe(30);
    expect(recursiva.getLCM(17, 53, 132)()).toBe(118932);
    expect(recursiva.getLCM(27, 74, 137)()).toBe(273726);
  });

  it("Testing getSum", () => {
    expect(soma.getSum(3, 5, 10)()).toBe(23);
  });

});