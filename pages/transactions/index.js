import { currencyFormatter } from "lib/utils";
import Transaction from "components/transactionObj";

const DummyData = [
  {
    id: 1,
    title: "Food",
    color: "lime",
    amount: 800,
  },
  {
    id: 2,
    title: "Movies",
    color: "lime",
    amount: 100,
  },
  {
    id: 3,
    title: "Google",
    color: "red",
    amount: 500,
  },
  {
    id: 4,
    title: "Bus / MRT",
    color: "lime",
    amount: 8,
  },
];

export default function Transactions() {
  return (
    <main className="container max-w-2x1 px-4 mx-auto">
      <section className="py-3">
        <small className="text-gray-400 text-md">My Balance</small>
        <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
      </section>

      <section className="flex items-center gap-2 py-3">
        <button className="btn btn-primary-outline">+ Ingoing</button>
        <button className="btn btn-primary">+ Outgoing</button>
      </section>

      <section className="py-6">
        <h3 className="text-2xl">Transactions</h3>
        <div className="flex flex-col gap-4 mt-6">
          <h4 className="text-gray-400 py-2">Thu, 31 Aug 2023</h4>

          {DummyData.map((transaction,index) => {
            return (
              <Transaction
                key={"transaction-" + index}
                color={transaction.color}
                title={transaction.title}
                amount={transaction.amount}
              />
            );
          })}

          <h4 className="text-gray-400 py-2">Tue, 1 Aug 2023</h4>

          <Transaction color="red" title="Bus / MRT" amount={10000} />
        </div>
      </section>
    </main>
  );
}
