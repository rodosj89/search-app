import { useEffect, useState } from 'react'
import { search } from '../service/searchService';
import { Toaster, toast } from 'react-hot-toast';
import TokenButton from './TokenButton';
import Stripe from './Stripe';
import { getRecomendation } from '../service/apigwService';
import ProviderPage from './ProviderPage';
import { usePacks } from '../context/packsContext';

function App() {
  const [strips, setStrips] = useState();
  const [recomendations, setRecomendations] = useState();
  const { packsState, packsDispatch } = usePacks();
  // const [valueToSearch, setValueToSearch] = useState()

  const handleText = async (e) => {
    if (e.target.value.length < 2) return
    // setValueToSearch(e.target.value)
    console.log(e.target.value);
    searchText(e.target.value)
  }

  const searchText = async (text) => {
    try {
      let { data } = await search(text, packsState.selectedPack)
      let stripes = Array.isArray(data) ? data : data.stripes
      stripes = await stripes.map(s => Object.assign({ selected: true, ...s }))
      setStrips(stripes)
      packsDispatch({ type: "RESET_CONTENT_STATE" })
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message || 'Disculpa, hubo un error en la busqueda!')
    }
  }

  const fetchRecomendation = async () => {
    try {
      const { data } = await getRecomendation()
      setRecomendations(data)
    } catch (e) {
      toast.error('Error al obtener las recomendaciones, verifica el token!')
    }
  }

  useEffect(() => {
    fetchRecomendation()
    window.addEventListener('change-env', fetchRecomendation)

    return () => {
      window.removeEventListener('change-env', fetchRecomendation)
    }
  }, [])

  /*
  useEffect(() => {
    /*
    const data = setTimeout(() => {
      search(valueToSearch)
    }, 2000)
    return () => clearTimeout(data)
  
  }, [valueToSearch])
*/
  return (
    <>
      <div className='ml-4'>
        <div className='flex flex-col mb-4'>
          <TokenButton />
          <div>
            <input type='text'
              onChange={handleText}
              placeholder='¿Qué estás buscando?'
              className='rounded-md p-1 my-4'
            />
          </div>
        </div>
        <ProviderPage setStrips={setStrips} />

        {strips && strips.map((s, i) => {
          if (s.contents.length == 0 && s.selected) return <div key={i}></div>
          return <Stripe contents={s.contents} title={s.name} type={s.stripeType} format='v1' i={i} key={i} />
        })
        }
        {
          strips && strips.filter(s => s.contents.length > 0).length === 0 && recomendations && recomendations.map((r, i) => {
            if (r.contents.length == 0 && r.selected) return <div key={i}></div>
            return <Stripe contents={r.contents} title={'Recomendados para vos'} type='recomendation' format='v2' i={i} key={i} />
          })
        }

      </div>
      <Toaster />
    </>
  )
}

export default App
