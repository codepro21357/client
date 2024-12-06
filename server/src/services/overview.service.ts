import Newsletter from '../models/newsletter.model';
import Transaction from '../models/transaction.model';
import User from '../models/user.model';

export const getOverview = async () => {
  const [
    sales,
    totalPurchaseAmount,
    newsletters,
    transactions,
    users,
  ] = await Promise.all([
    Transaction.aggregate([
      {
        $match: {
          transactionType: 'purchase',
          status: 'successful',
        },
      },
      {
        $project: {
          total: { $toDouble: '$total' },
        },
      },
      {
        $group: {
          _id: null,
          totalSum: { $sum: '$total' },
        },
      },
    ]),
    Transaction.aggregate([
      {
        $match: {
          transactionType: 'purchase',
          status: 'successful',
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: {
            $sum: { $toDouble: '$amount' },
          },
        },
      },
    ]),
    Newsletter.find({}),
    Transaction.find({}),
    User.find({}),
  ]);

  const overview = [];
  overview.push({
    id: 1,
    title: 'Sales',
    value: sales[0]?.totalSum ? sales[0]?.totalSum : 0,
  });
  overview.push({
    id: 2,
    title: 'Bitcoin',
    value: totalPurchaseAmount[0]?.totalAmount
      ? totalPurchaseAmount[0]?.totalAmount
      : 0,
  });
  overview.push({
    id: 3,
    title: 'Transactions',
    value: transactions.length,
  });
  overview.push({
    id: 4,
    title: 'Users',
    value: users.length,
  });
  overview.push({
    id: 5,
    title: 'Newsletters',
    value: newsletters.length,
  });

  return overview;
};

// GET SALES
export const getSales = async () => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  const data = await Transaction.aggregate([
    {
      $match: {
        createdAt: {
          $gte: lastYear,
        },
        transactionType: 'purchase',
        status: 'successful',
      },
    },
    {
      $project: {
        month: { $month: '$createdAt' },
        total: { $toDouble: '$total' },
      },
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: '$total' },
        transactions: { $sum: 1 },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  return data;
};
