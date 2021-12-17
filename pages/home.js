import Head from 'next/head'
import Link from 'next/link'
import NftCard from '../components/NftCard'
import {ethers} from 'ethers'
import MARKET from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import { nftmarketaddress, nftaddress } from '../utils'
import { useEffect, useState } from 'react'

function home() {

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedNFT, setSelectedNFT] = useState({img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVUaa23rsJVBmxdzEEZwY6ShZ8D_lju6v7mg&usqp=CAU'})

    const getBlockChainData = async () => {

        const provider = new ethers.providers.JsonRpcProvider('https://matic-mumbai.chainstacklabs.com')
        const Nft = new ethers.Contract(nftaddress,NFT.abi, provider)
        const market = new ethers.Contract(nftmarketaddress,MARKET.abi, provider)
        
        try {
          const data = await market.fetchNFTs()
          const items = await Promise.all(data.map(async i => {
            const tokenUri = await Nft.tokenURI(i.tokenId)
            console.log(tokenUri)
            //const metadata = meta.data
            const nftId = Number(i.itemId)
            const owner = i.owner
            const price = ethers.utils.formatUnits(i.price, 'ether')
            const nft = {
              nftId,
              price,
              owner,
              //metadata
            }
            return nft 
          }))
          setItems(items)
          setLoading(false)
        } catch(err) {
          console.log(err)
        }
    }

    useEffect(() => {
        getBlockChainData()  
    }, [])
    console.log(items)

    return (
        <div>
            <Head>
              <title> Cyrrus </title>
              <meta name="description" content="Decentralized NFT marketplace" />
              <link rel="icon" href="/phonto.ico" />
            </Head>
            <nav className='flex h-12 items-center justify-between text-white px-4 border-b-2 border-white bg-purple-600 font-merkim'>
              <h1 className='text-xl font-extrabold '>CYRRUS</h1>
              <section className='sm:w-7/12 md:w-5/12 lg:w-4/12 flex items-center justify-between h-3/4'>
                <Link className='text-blue-600' href={'/mint'} passHref><span className='bg-white text-blue-600 h-full flex items-center justify-center px-2 md:px-4 text-xs md:text-lg rounded-lg border-2 hover:border-blue-600 cursor-pointer mr-1'>Upload</span></Link>
                <button className='bg-white text-blue-600 h-full flex items-center justify-center px-2 md:px-4 text-xs md:text-lg rounded-lg border-2 hover:border-blue-600'>Connect wallet</button>
              </section>
            </nav>

            <main className='flex flex-col-reverse md:flex-row w-full content-area overflow-hidden'>
                <div className='flex-1 flex md:justify-center  items-center  md:flex-wrap overflow-scroll scrollbar-hide md:gap-8 border-t-2 md:border-r-2 border-blue-200'>
                    <NftCard selectNFt={setSelectedNFT} img={'https://v2.cimg.co/news/63800/36648/screenshot-2021-11-02-at-17-13-00-cryptopunks-details-for-punk-7557.png'}/>
                    <NftCard selectNFt={setSelectedNFT} img={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeqtBb622sVR1nMK_th6n0ZyK_0BccT8nesQ&usqp=CAU'}/>
                    <NftCard selectNFt={setSelectedNFT} img={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzFM9wWLM7ad_92Q357cIW9IQjGhptcROCIg&usqp=CAU'}/>
                    <NftCard selectNFt={setSelectedNFT} img={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVUaa23rsJVBmxdzEEZwY6ShZ8D_lju6v7mg&usqp=CAU'}/>
                    <NftCard selectNFt={setSelectedNFT} img={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzFM9wWLM7ad_92Q357cIW9IQjGhptcROCIg&usqp=CAU'}/>
                    <NftCard selectNFt={setSelectedNFT} img={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVUaa23rsJVBmxdzEEZwY6ShZ8D_lju6v7mg&usqp=CAU'}/>
                    
                </div>
                <div className='w-full h-2/5 md:h-full md:w-96 flex items-center justify-center py-4'>
                    <section className='bg-white border-2 border-gray-500 h-full md:h-4/6 w-11/12 overflow-hidden rounded-xl'>
                        <img className='h-5/6 w-full' src={selectedNFT.img} alt="" />
                        <h2 className='m-2 md:m-4 text-lg font-bold'>This punk</h2>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default home
