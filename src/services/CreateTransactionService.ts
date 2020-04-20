import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import CreateTransactionDTO from '../DTO/CreateTransactionDTO';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(createTransactionDTO: CreateTransactionDTO): Transaction {
    // execute de funcion get balance that was imported from TransactionRepo
    const balance = this.transactionsRepository.getBalance();

    if (
      createTransactionDTO.type === 'outcome' &&
      createTransactionDTO.value > balance.total
    ) {
      throw new Error('This money is  not enough');
    }

    return this.transactionsRepository.create(createTransactionDTO);
  }
}

export default CreateTransactionService;
