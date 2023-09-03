import Link from "next/link";

export default function Navbar() {

    return (<header className="container max-w-2x1 px-4 py-4 mx-auto pb-8">
        <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Finance App</h1>
        <div className="flex items-center gap-2">
        <Link href="/">Home</Link>
        <Link href="/transactions">Transactions</Link>
        <Link href="/">Logout</Link>
        </div>
        </div>  
        </header>)
}