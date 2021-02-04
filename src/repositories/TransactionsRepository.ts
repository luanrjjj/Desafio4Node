import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransanctionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const lista: number[] = [];
    const lista1: number[] = [];
    let income = 0;
    let outcome = 0;

    // eslint-disable-next-line array-callback-return
    this.transactions.map(element => {
      if (element.type === 'income') {
        lista.push(element.value);
      } else lista1.push(element.value);
    });

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const listanova = lista.map(i => Number(i));
    const listanova1 = lista1.map(i => Number(i));

    income = listanova.reduce((a: number, b: number): number => a + b, 0);

    outcome = listanova1.reduce((a: number, b: number): number => a + b, 0);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  // eslint-disable-next-line class-methods-use-this
  public create({ title, value, type }: CreateTransanctionDTO): Transaction {
    const transaction = new Transaction({
      title,
      type,
      value,
    });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
