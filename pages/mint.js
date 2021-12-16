import Image from 'next/image'

function Mint() {
    return (
        <div className="flex h-screen items-center justify-center">
            <section className=" h-4/6 w-11/12 lg:w-10/12 lg:h-4/6 xl:w-7/12 xl:h-4/6 bg-blue-600 flex flex-col py-6 items-center rounded-xl">
                <p className='font-bold text-white text-sm md:text-xl mb-12'>Upload your NFT here and start earning</p>
                <section className="flex">
                    <section className='hidden md:block'><Image src="/bg.png" alt="" height={300} width={300} /></section>
                    
                    <form className="flex-1 flex flex-col items-center">
                      <input type="text" placeholder="Name your art..." className='mb-4 w-5/6 sm:w-full border-0 outline-none h-8 rounded-lg pl-2'/>
                      <input type="text" placeholder="Describe your art..." className='mb-4 w-5/6 sm:w-full border-0 outline-none h-8 rounded-lg pl-2' />
                      <input type="number" placeholder="Price it..." className='mb-4 border-0 w-5/6 sm:w-full outline-none h-8 rounded-lg pl-2' />
                      <input type="file" className='px-2 py-1.5 w-5/6 sm:w-full text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg' />
                      <button type="submit" className='mt-14 w-7/12 bg-white text-blue-600 px-1 py-2 font-bold font-merkim text-lg uppercase rounded-lg'>Upload</button>
                   </form>
                </section>
                
            </section>
            
        </div>
    )
}

export default Mint
