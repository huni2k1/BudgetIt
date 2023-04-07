const transactionRouter = require('express').Router();
const Transaction = require('../models/transaction');

transactionRouter.get('/:id', async (request, response) => {
  const transactionId = request.params.id;
  Transaction.findById(transactionId).then(transaction => {
    response.json(transaction);
  });
});

transactionRouter.get('/', async (request, response) => {
  Transaction.find({}).then(transactions => {
    response.json(transactions);
  });
});

transactionRouter.post('/', async (request, response) => {
  const { amount, description } = request.body;

  const transaction = new Transaction({
    amount,
    description,
  });

  const savedTransaction = await transaction.save();

  response.status(201).json(savedTransaction);
});

transactionRouter.put('/:id', async (request, response) => {
  const transactionId = request.params.id;
  const { amount, description } = request.body;

  const updatedTransaction = await Transaction.findByIdAndUpdate(
    transactionId,
    { amount, description },
    { new: true }
  );

  response.json(updatedTransaction);
});

transactionRouter.delete('/:id', async (request, response) => {
  const transactionId = request.params.id;

  await Transaction.findByIdAndDelete(transactionId);

  response.status(204).end();
});

module.exports = transactionRouter;
