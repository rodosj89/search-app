import { useState } from "react";
import { usePacks } from "../context/packsContext";
import Loader from "./Loader";
import { hostImages } from "../utils/config";
import { getPageStructure } from "../service/searchService";
import PillsStripe from './PillsStripe';


function ProviderPage(props) {
    const { packsState, packsDispatch } = usePacks();
    const [loading, setLoading] = useState(false)
    const {
        setStrips = () => {},
    } = props


    const handleClick = async (pack) => {
      setLoading(true)
        const result = await getPageStructure(pack.id)
        packsDispatch({ type: "SET_SELECTED_PACK", payload: {name: pack.osName, content: result } })
        setStrips(null)
        setLoading(false)
    }

    const pageStripesMapper = (s, i) => {
        if (s.title.includes('SuperHero')) return <></>
        if (s.content.contents.length == 0 && s.selected) return <></>
        return <div key={i} className='w-full'>
          <p id={`${s.stripeType}-title`} className='font-semibold text-white text-xl'>{s.title}</p>
          <div id={`${s.stripeType}-strip`} className='mt-1 mb-6 inline-flex overflow-x-auto w-full'>
            {s.content.contents.map((c, j) => {
              const img = c.images[0]
              if (img == undefined) return <></>
              return <div key={j} className='flex-shrink-0 flex items-center h-56 '>
                <div className='relative h-44 w-32 object-cover mx-1 group'>
                  <h3 className='absolute z-10 ml-1 p-1 text-lg w-32 text-white group-hover:invisible bg-origin-padding bg-gradient-to-br from-green-900 to-transparent from-60% opacity-70 rounded-t-md'>{c.title}</h3>
                  <img
                    src={`${hostImages[localStorage.getItem('env')]}/images/vod/vod/350/500/0/0/${img.suffix}.${img.format}`} key={j}
                    className='w-full h-full rounded-md cursor-pointer group-hover:shadow-md group-hover:shadow-default group-hover:scale-125 group-hover:mx-4 group-hover:ml-0  mx-1 duration-300'
                    alt={c.title.default} />
    
                </div>
              </div>
            })
            }</div>
        </div>
      }

    return(
        <>
        <div>
            <PillsStripe setStrips={setStrips} handleClick={handleClick} />
        </div>
        {
            !loading && packsState.packsContent && packsState.packsContent.map(pageStripesMapper)
        }
        {
            loading && <Loader/>
        }
        </>
    )
}

export default ProviderPage;