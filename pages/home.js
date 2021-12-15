import Link from 'next/link'
import NftCard from '../components/NftCard'

function home() {
    return (
        <div>
            <nav className='flex h-12 items-center justify-between text-white px-4 border-b-2 border-white bg-purple-600 font-merkim'>
              <h1 className='text-xl font-extrabold '>CYRRUS</h1>
              <section className='sm:w-7/12 md:w-5/12 lg:w-4/12 flex items-center justify-between h-3/4'>
                <Link className='text-blue-600' href={'/mint'} passHref><span className='bg-white text-blue-600 h-full flex items-center justify-center px-2 md:px-4 text-xs md:text-lg rounded-lg border-2 hover:border-blue-600 cursor-pointer mr-1'>Upload</span></Link>
                <button className='bg-white text-blue-600 h-full flex items-center justify-center px-2 md:px-4 text-xs md:text-lg rounded-lg border-2 hover:border-blue-600'>Connect wallet</button>
              </section>
            </nav>

            <main className='flex flex-col-reverse md:flex-row w-full content-area overflow-hidden'>
                <div className='flex-1 flex items-center justify-center md:flex-wrap overflow-scroll scrollbar-hide gap-8 border-t-2 md:border-r-2 border-blue-200'>
                    <NftCard/>
                    <NftCard/>
                    <NftCard/>
                    <NftCard/>
                    <NftCard/>
                    <NftCard/>
                </div>
                <div className='w-full h-2/5 md:h-full md:w-96 flex items-center justify-center py-4'>
                    <section className='bg-white border-2 border-gray-500 h-full md:h-4/6 w-11/12 overflow-hidden rounded-xl'>
                        <img className='h-5/6 w-full' src="https://v2.cimg.co/news/63800/36648/screenshot-2021-11-02-at-17-13-00-cryptopunks-details-for-punk-7557.png" alt="" />
                        <h2 className='m-2 md:m-4 text-lg font-bold'>This punk</h2>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default home
