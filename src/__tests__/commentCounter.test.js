import commentCount from '../__mocks__/CommentMock.js';

test('Test for comment Counter', () => {
  expect(commentCount.length).toBe(3);
});
