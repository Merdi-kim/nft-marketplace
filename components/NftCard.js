function NftCard() {
    return (
        <div className="bg-gray-200 h-80 md:h-96 w-64 rounded-xl m-4 overflow-hidden flex-none cursor-pointer">
            <img className="h-4/6" src="https://v2.cimg.co/news/63800/36648/screenshot-2021-11-02-at-17-13-00-cryptopunks-details-for-punk-7557.png" alt="" />
            <h2 className="font-bold m-1 md:m-2">This punk</h2>
            <p className="mb-2 flex justify-end pr-2 text-xs">0.4 MATIC</p>
            <button className="text-white w-10/12 bg-blue-600 ml-3 rounded-lg font-bold border-2 hover:bg-white hover:border-blue-600 hover:text-blue-600">Buy</button>
            <p className="m-1 md:m-2">Owner: 0x00...00</p>
        </div>
    )
}

export default NftCard
