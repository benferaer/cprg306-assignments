export default function Item(props) {
    const {name, quantity, category, onSelect} = props;

    return (
        <section className="bg-emerald-950 m-4 w-80 rounded-lg ml-5"
            onClick={() => onSelect(name, quantity, category)}>
            <li className="p-3 pl-5">
                <span>Item: {name}</span>
                <div className="pl-5">Quantity: {quantity}</div>
                <div className="pl-5">Category: {category}</div>
            </li>
        </section>
    );
}