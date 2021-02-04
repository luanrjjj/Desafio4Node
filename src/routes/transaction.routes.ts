import { Router } from 'express';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

// eslint-disable-next-line consistent-return
transactionRouter.get('/', (request, response) => {
  try {
    // eslint-disable-next-line no-undef
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response.json({
      transactions,
      balance,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// eslint-disable-next-line consistent-return
transactionRouter.post('/', (request, response) => {
  let transaction: Transaction | undefined;
  let balance = transactionsRepository.getBalance();
  try {
    const { title, type, value } = request.body;
    // eslint-disable-next-line no-console
    console.log(request.body);

    // eslint-disable-next-line no-console
    console.log(balance);
    // eslint-disable-next-line no-console
    console.log(balance.income);

    if (
      type === 'outcome' &&
      balance.income > Number(value) + balance.outcome
    ) {
      const createTransaction = new CreateTransactionService(
        transactionsRepository,
      );

      transaction = createTransaction.execute({
        title,
        type,
        value,
      });
      balance = transactionsRepository.getBalance();
    } else if (type === 'income') {
      const createTransaction = new CreateTransactionService(
        transactionsRepository,
      );

      transaction = createTransaction.execute({
        title,
        type,
        value,
      });
      balance = transactionsRepository.getBalance();
    } else if (
      type === 'outcome' &&
      balance.income < Number(value) + balance.outcome
    ) {
      response.status(400).json({ error: 'Sem Saldo' });
    }
    /*
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    transaction = createTransaction.execute({
      title,
      type,
      value,
    });
*/
    // eslint-disable-next-line no-console
    console.log(balance);
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
