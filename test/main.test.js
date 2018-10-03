const mockPaymentQueue = jest.fn();

jest.doMock("../src/queueService", () => {
  return mockPaymentQueue;
})

jest.mock("../src/paymentService");

const processPayments = require("../src/main");
const {makePayment, refundPayment} = require("../src/paymentService");

beforeEach(() => {
  jest.clearAllMocks();
  mockPaymentQueue.mockReset();
})

test('does not call makePayment or refundPayment when paymentQueue is empty', () => {
  mockPaymentQueue.mockReturnValue ([]);

  processPayments();

  expect(makePayment).not.toHaveBeenCalled();
  expect(refundPayment).not.toHaveBeenCalled();

});

test('calls makePayment when next item in paymentQueue is positive', () => {
  mockPaymentQueue.mockReturnValue ([100]);
  processPayments();

  expect(makePayment).toHaveBeenCalledTimes(1);
  expect(makePayment).toHaveBeenCalledWith(100);
  expect(refundPayment).not.toHaveBeenCalled();
});

test('calls refundPayment when next item in paymentQueue is negative', () => {
  mockPaymentQueue.mockReturnValue ([-100]);
  processPayments();

  expect(makePayment).not.toHaveBeenCalled();
  expect(refundPayment).toHaveBeenCalledTimes(1);
  expect(refundPayment).toHaveBeenCalledWith(-100);
});
