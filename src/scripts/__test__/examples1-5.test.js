import '../examples/ex4_implement-map';
import newReleases from '../mocks/data';
import { traversingArray, traversingWithForEach } from '../examples/ex1_ex2';
import projectingArrays from '../examples/ex3-projecting-arrays';

const names = ['Ben', 'Jafar', 'Matt', 'Priya', 'Brian'];

describe('ex1 - ex5', () => {
  // ex1
  test('traversingArray', () => {
    const result = traversingArray(names);
    expect(result).toEqual(names);
  });

  //ex2
  test('traversingWithForEach', () => {
    const result = traversingWithForEach(names);
    expect(result).toEqual(names);
  });

  // ex3
  test('projectingArrays', () => {
    const resultArr = [
      {
        id: 70111470,
        title: 'Die Hard',
      },
      {
        id: 654356453,
        title: 'Bad Boys',
      },
      {
        id: 65432445,
        title: 'The Chamber',
      },
      {
        id: 675465,
        title: 'Fracture',
      },
    ];
    const result = projectingArrays(newReleases);
    expect(result).toEqual(resultArr);
  });

  // ex4
  test('implementMap', () => {
    const arr = [1, 2, 3];
    const res = arr.myMap(i => i + 1);
    expect(res).toEqual([2, 3, 4]);
  });

  // ex5
  test('projectingArrays', () => {
    const resultArr = [
      {
        id: 70111470,
        title: 'Die Hard',
      },
      {
        id: 654356453,
        title: 'Bad Boys',
      },
      {
        id: 65432445,
        title: 'The Chamber',
      },
      {
        id: 675465,
        title: 'Fracture',
      },
    ];

    const result = newReleases.myMap(video => {
      return { id: video.id, title: video.title };
    });
    expect(result).toEqual(resultArr);
  });
});
