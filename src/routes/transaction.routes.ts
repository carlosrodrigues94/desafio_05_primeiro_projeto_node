import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

import CreateTransactionDTO from '../DTO/CreateTransactionDTO';
const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    // Find all transactions
    const transactions = transactionsRepository.all();
    // Execute a funcion to get a balance from them
    const balance = transactionsRepository.getBalance();
    // return the transactions and the balance in a object
    return response.json({
      transactions,
      balance,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // import of service to save the transaction
    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );
    // using the DTO
    const createTransactionDTO: CreateTransactionDTO = {
      title: request.body.title,
      value: request.body.value,
      type: request.body.type,
    };

    const transaction = createTransactionService.execute(createTransactionDTO);

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
