
jest.mock("mathjs", () => {
  return {
    randomInt: jest.fn()
  }
});

const generateQueue = require("../src/queueService");
const math = require("mathjs");

beforeEach(() => {
  jest.resetAllMocks();
})

test('generate empty queue', () => {
  math.randomInt.mockReturnValueOnce(0);

  expect(generateQueue()).toEqual([]);

})

test('generate a queue with 3 elements, and each element is 0', () => {
  math.randomInt
  .mockReturnValueOnce(3)
  .mockReturnValueOnce(0)
  .mockReturnValueOnce(0)
  .mockReturnValueOnce(0)

  expect(generateQueue()).toEqual([0,0,0]);

})
