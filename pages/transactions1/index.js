import { currencyFormatter } from "../../lib/utils";
import Transaction from "components/Transactions/TransactionObj";

const DummyData = [
  {
    id: 1,
    title: "Food",
    bank: "DBS",
    color: "lime",
    amount: 800,
    date: "2021-10-01",
  },
  {
    id: 2,
    title: "Movies",
    bank: "OCBC",
    color: "lime",
    amount: 100,
    date: "2021-09-01",
  },
  {
    id: 3,
    title: "Google",
    bank: "DBS",
    color: "red",
    amount: 500,
    date: "2021-09-021",
  },
  {
    id: 4,
    title: "Bus / MRT",
    bank: "TrustBank",
    color: "lime",
    amount: 8,
    date: "2022-11-01",
  },
];

export default function Transactions() {
  return (
    <main className="container max-w-7xl px-4 mx-auto">
      <section className="py-6">
        <h3>Transactions</h3>
        <div className="flex flex-col gap-4 mt-6">

          {DummyData.map((transaction, index) => {
            return (
              <Transaction
                key={"transaction-" + index}
                color={transaction.color}
                title={transaction.title}
                bank={transaction.bank}
                amount={transaction.amount}
                date={transaction.date}
                id={transaction.id}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
