import ItemList from "./item-list";

export default function Page() {
    return (
      <main>
        <h1 className="font-bold text-5xl m-5 text-blue-300">Shopping List</h1>
        <ItemList />
      </main>
    );
  }