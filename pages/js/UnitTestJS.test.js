const check_pass_diff = require('./rеgister');
const login = require('./rеgister');

test('Check login > 5', () => {
  expect(login()).toBe(true);
});
test('Check pass_1 == pass_2', () => {
  expect(check_pass_diff()).toBe(true);
});
