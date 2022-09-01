import Api from '../__mocks__/mealsDB.js';

test('Test for item-counter on Homepage', async () => {
  const resultant = await Api.get();
  const { meals } = resultant;
  expect(meals.length).toBe(4);
});