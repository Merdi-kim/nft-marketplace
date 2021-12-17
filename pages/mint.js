import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { NFTStorage, File } from 'nft.storage'
import {ethers} from 'ethers'
import Web3Modal from 'web3modal'
import MARKET from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import { nftmarketaddress, nftaddress } from '../utils'
import {IconCircle} from '@tabler/icons'

function Mint() {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [img, setImg] = useState()
    const [thumbnail, setThumbnail] = useState('')
    const [load, setLoad] = useState(false)
    const router = useRouter()

    const uploadThumbnail = (e) => {
        e.preventDefault()
        const url = URL.createObjectURL(e.target.files[0])
        setThumbnail(url)
        setImg(e.target.files)
    }

    const uploadNFT = async(e) => {
        e.preventDefault()
        setLoad(true)

        if(!name || !description || !price || img.length == 0) {
            return
        }

        const web3modal = new Web3Modal()
        const connection = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const market = new ethers.Contract(nftmarketaddress, MARKET.abi, signer )
        const nft = new ethers.Contract(nftaddress, NFT.abi, signer)
        const apiKey = process.env.NEXT_PUBLIC_NFTKEY
        const client = new NFTStorage({ token: apiKey })

        const metadata = await client.store({
          name,
          description,
          image: new File([img[0]], `${name}.jpg`, { type: 'image/jpg' })
        })

        let tx = await nft.createToken(metadata.url)
        let transaction = await tx.wait()
        const event = transaction.events[0] 
        const tokenId = event.args[2].toNumber()

    tx = await market.mintNFT(nftaddress, tokenId, ethers.utils.parseEther(price), {value: ethers.utils.parseEther('0.025')})
        transaction = await tx.wait()
        router.push('/home')
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <section className=" h-4/6 w-11/12 lg:w-10/12 lg:h-4/6 xl:w-7/12 xl:h-4/6 bg-blue-600 flex flex-col py-6 items-center rounded-xl">
                <p className='font-bold text-white text-sm md:text-xl mb-12'>Upload your NFT here and start earning</p>
                <section className="flex">
                    <section className='hidden md:block overflow-hidden mr-2'><Image src={thumbnail?thumbnail :"/bg.png"} alt="" height={300} width={300} /></section>
                    
                    <form className="flex-1 flex flex-col items-center" onSubmit={uploadNFT}>
                      <input type="text" placeholder="Name your art..." className='mb-4 w-5/6 sm:w-full border-0 outline-none h-8 rounded-lg pl-2' onChange={(e) => {setName(e.target.value)}}/>
                      <input type="text" placeholder="Describe your art..." className='mb-4 w-5/6 sm:w-full border-0 outline-none h-8 rounded-lg pl-2' onChange={(e) => {setDescription(e.target.value)}}/>
                      <input type="number" placeholder="Price it..." className='mb-4 border-0 w-5/6 sm:w-full outline-none h-8 rounded-lg pl-2' onChange={(e) => {setPrice(e.target.value)}}/>
                      <input type="file" accept='image/*' className='px-2 py-1.5 w-5/6 sm:w-full text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg' onChange={uploadThumbnail}/>
                      <button type="submit" className='flex justify-center mt-14 w-7/12 bg-white text-blue-600 px-1 py-2 font-bold font-merkim text-lg uppercase rounded-lg' disabled={load}> {!load?'Upload':<IconCircle className='move'/>} </button>
                   </form>
                </section>
                
            </section>
            
        </div>
    )
}

export default Mint
