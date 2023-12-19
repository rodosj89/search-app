import { usePacks } from '../context/packsContext';
import { providerPageId } from '../utils/config';
import Pill from './Pill';


function PillsStripe(props) {
    
    const {
        setStrips = () => {},
        handleClick = () => {}
    } = props;

    const { packsState, packsDispatch } = usePacks();

    const filtersHandleClick = () => {
      packsDispatch({ type: "RESET_ALL_STATE" })
      setStrips(null)
    }

    return (
        <div>
          {
            !packsState.selectedPack && Array.isArray(providerPageId) && providerPageId.map(p => (<Pill pack={p} handleClick={handleClick} />))
          }
          {
            packsState.selectedPack && <span
            className='px-3 py-0.5 rounded-full text-sm font-medium leading-5 text-white cursor-pointer'
            onClick={filtersHandleClick}
            >
              Borrar filtros: <span style={{fontWeight: "bold"}}>{ packsState.selectedPack }</span>
            </span>
          }
        </div>
    )
}

export default PillsStripe;