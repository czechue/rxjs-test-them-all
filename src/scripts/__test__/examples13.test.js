import '../examples/implementation';

describe('ex13 Retrieve id, title, and a 150x200 box art url for every video', () => {
  test('ex13 implement concatMap', () => {
    const spanishFrenchEnglishWords = [
      ['cero', 'rien', 'zero'],
      ['uno', 'un', 'one'],
      ['dos', 'deux', 'two'],
    ];
    const expected = ['cero', 'rien', 'zero', 'uno', 'un', 'one', 'dos', 'deux', 'two'];
    const result = spanishFrenchEnglishWords.concatMap(item => item);
    expect(result).toEqual(expected);
  });
});
