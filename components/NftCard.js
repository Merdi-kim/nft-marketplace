import Web3Modal from 'web3modal'
import {ethers} from 'ethers'
import { nftmarketaddress, nftaddress } from '../utils'
import MARKET from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import { useState } from 'react'
import {IconCircle} from '@tabler/icons'
import Identicon from 'react-identicons';

function NftCard({selectNFt,img,price, owner,name,description}) {

    const [load, setLoad] = useState(false)

    const buyNFT = async() => {
        setLoad(true)
        const web3modal = new Web3Modal()
        const connection = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const market = new ethers.Contract(nftmarketaddress, MARKET.abi, signer)
        const tx = await market.sellNFT(nftaddress,2, {value: ethers.utils.parseEther('1')})
        await tx.wait()
        window.location.reload()
    }

    const getNFT = () => {
        selectNFt({
            img,
            name,
            owner
        })
    }

    return (
        <div className="relative bg-gray-200 h-80 md:h-96 w-64 rounded-xl m-4 overflow-hidden flex-none cursor-pointer border-2 border-blue-600" >
            <img className="h-4/6" src={img} alt="" onMouseOver={getNFT}/>
            <h2 className="font-bold m-1 md:m-2">{name}</h2>
            <p className="mb-2 flex justify-end pr-2 text-xs">{price} MATIC</p>
            <button className="flex justify-center text-white w-10/12 bg-blue-600 ml-3 rounded-lg font-bold border-2 hover:bg-white hover:border-blue-600 hover:text-blue-600" onClick={buyNFT} disabled={load}>{!load?'Buy':<IconCircle className='move'/>}</button>
            <p className="flex justify-center xxs mt-2 sm:mt-4 "><span>Owner:{owner}</span></p>
            <span className='absolute top-2 right-3 bg-white h-10 w-11 flex justify-center items-center border-2 border-blue-600 rounded-full'><Identicon string={owner} size={20}/></span>
        </div>
    )
}

export default NftCard
