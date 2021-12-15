function CountCard({number, name}) {
    return (
        <div className="flex flex-col">
            <span className="font-bold text-2xl mr-10">{number}k +</span>
            <span>{name}</span>
        </div>
    )
}

export default CountCard
