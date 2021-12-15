import Head from 'next/head'
import Link from 'next/link'
import CountCard from '../components/CountCard'
export default function Home() {
  
  return (

    <div className='text-black  '>
      <Head>
        <title > Cyrrus </title>
        <meta name="description" content="Decentralized NFT marketplace" />
        <link rel="icon" href="/phonto.ico" />
      </Head>

      <nav className='flex h-12 items-center justify-between text-white px-4 border-b-2 border-white bg-purple-600 font-merkim'>
        <h1 className='text-xl font-extrabold '>CYRRUS</h1>
        <Link href={'/home'}>Marketplace</Link>
      </nav>

      <main className='flex flex-col-reverse sm:flex-row'>
        <div className='flex-1 h-screen flex flex-col items-center justify-center'>
          <section className='text-4xl flex-reverse sm:text-6xl font-extrabold mb-12 pl-12 w-full font-tt'>Discover and sell awesome <span className='text-purple-600'>NFTs</span></section>
          <p className='w-10/12 mb-16 font-merkim'>Buy,sell and own digital art from your favorite artists and enjoy low gas fees on polygon. All you need is a wallet with $MATIC and you're all set. Now launch the app and enjoy digital arts</p>
          <section className='flex w-full justify-start px-12 mb-16'><Link href={'/home'}><span className='bg-purple-600 text-2xl py-3 px-6 rounded-xl border-2 border-white cursor-pointer font-tt text-white'>Explore now </span></Link></section>
          <section className='flex w-full justify-start pl-12 font-merkim'>
            <CountCard number={30} name={'Artists'}/>
            <CountCard number={100} name={'NFTs'}/>
          </section>
        </div>
        <div className='flex-1 flex items-center h-screen'>
          <img className='my-4 md:h-3/6 lg:h-4/6 xl:h-5/6' src="/bg.png" alt="" />
        </div>
      </main>
    </div>

  )
}
