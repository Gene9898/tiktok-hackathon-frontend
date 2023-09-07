import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flexbox">
      <div className="flex items-center justify-between">
        <h1>FinanceApp</h1>
        <div className="flex items-center sm:gap-2">
          <Link href="/">Home</Link>
          <Link href="/transactions">Transactions</Link>
          <Link href="/cardsPage">Cards</Link>
        </div>
      </div>
    </header>
  );
}
