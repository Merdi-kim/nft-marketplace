import Link from 'next/link'
import NftCard from '../components/NftCard'

function home() {
    return (
        <div>
            <nav className='flex h-12 items-center justify-between text-white px-4 border-b-2 border-white bg-purple-600 font-merkim'>
              <h1 className='text-xl font-extrabold '>CYRRUS</h1>
              <section>
                <Link href={'/mint'}>Upload</Link>
                <img src="" alt="" />
              </section>
              
            </nav>

            <main className='flex flex-col-reverse md:flex-row w-full h-screen overflow-hidden'>
                <div className='flex-1 bg-pink-900 flex md:flex-wrap overflow-scroll gap-8'>
                    <NftCard/>
                    <NftCard/>
                    <NftCard/>
                    <NftCard/>
                    <NftCard/>
                    <NftCard/>
                </div>
                <div className='w-96 bg-pink-600 flex items-center justify-center py-4'>
                    <section className='bg-blue-300 h-full md:h-4/6 w-11/12 overflow-hidden rounded-xl'>
                        <img className='h-5/6' src="https://v2.cimg.co/news/63800/36648/screenshot-2021-11-02-at-17-13-00-cryptopunks-details-for-punk-7557.png" alt="" />
                        <h2 className='m-4 text-lg font-bold'>This punk</h2>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default home
