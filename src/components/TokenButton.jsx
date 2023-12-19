import { useEffect, useState } from "react"

function TokenButton () {
    const [hiddeInput, setHiddeInput] = useState(true)
    const [env, setEnv] = useState(localStorage.getItem('env') || 'dev')
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')))

    const handleToken = async (e) => {
        let token = JSON.parse(localStorage.getItem('token')) || {}
        token[env] = e.target.value
        localStorage.setItem('token', JSON.stringify(token))
        setToken(token)
    }

    useEffect(() => {
        const closeTextArea = (e) => {
            if (e.target && !['token-btn','token-text','dev-btn','uat-btn','pro-btn'].includes(e.target.id)) {
              setHiddeInput(true)
            }
          }
          document.addEventListener('click', closeTextArea)
        return () => document.removeEventListener('click', closeTextArea)
    },[])

    useEffect(() => {
      const input = document.getElementById('token-text')
      input.value = token && token[env] !== undefined ? token[env] : ''
      localStorage.setItem('env', env)
      window.dispatchEvent(new Event("change-env"))
    }, [env])

    return (
        <>
        <div className='flex flex-col mt-4 absolute right-4'>
            <div className='flex justify-end'>
             <button id="token-btn" className='text-white border  shadow-sm shadow-default rounded-md p-1 hover:border-default hover:border-2 hover:bg-default' onClick={() => setHiddeInput(!hiddeInput)}>Token</button>
            </div>
            <div id='token-tool' className={`${hiddeInput && 'hidden'} z-20 -mt-6`}>
              <button id="dev-btn" className={`text-white border border-b-0 rounded-t-md p-1 px-2 hover:border-default hover:bg-default mx-1 ${env == 'dev' && 'bg-default'}`} onClick={() => setEnv('dev')}>Develop</button>
              <button id="uat-btn" className={`text-white border border-b-0 rounded-t-md p-1 px-2 hover:border-default hover:bg-default mx-1 ${env == 'uat' && 'bg-default'}`} onClick={() => setEnv('uat')}>Testing</button>
              <button id="pro-btn" className={`text-white border border-b-0 rounded-t-md p-1 px-2 hover:border-default hover:bg-default mx-1 ${env == 'pro' && 'bg-default'}`} onClick={() => setEnv('pro')}>Produccion</button>
              <textarea 
                id='token-text'
                hidden={true}
                onChange={handleToken} 
                placeholder='Bearer ...'
                className={`flex float rounded-sm p-1 -my-0.5  w-96 `}
                rows={8}
                defaultValue={localStorage.getItem('token')}
                />
            </div>
          </div>
          
        </>
    )
}

export default TokenButton