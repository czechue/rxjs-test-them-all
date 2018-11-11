// const sum = require();
import { traversingArray, traversingWithForEach } from '../src/scripts/examples/ex1';
import projectingArrays from '../src/scripts/examples/ex3-projecting-arrays';
import newReleases from './mocks/data';

const names = ['Ben', 'Jafar', 'Matt', 'Priya', 'Brian'];

test('traversingArray', () => {
  const result = traversingArray(names);
  expect(result).toEqual(names);
});

test('traversingWithForEach', () => {
  const result = traversingWithForEach(names);
  expect(result).toEqual(names);
});

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
