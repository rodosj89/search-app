import { createContext, useReducer, useContext } from'react';

export const packsContext = createContext();


const packsReducer = (state, action) => {
    switch(action.type) {  
        case "SET_SELECTED_PACK": 
            return {
                ...state,
                selectedPack: action.payload.name,
                packsContent: action.payload.content
            }
        case "RESET_CONTENT_STATE":
            return {
               ...state,
                packsContent: null
            }
        case "RESET_PACK_STATE":
            return {
                ...state,
                selectedPack: "",
            }
        case "RESET_ALL_STATE":
            return {
                selectedPack: "",
                packsContent: null
            }
        default:
            return state
    } 
}

function PacksProvider(props) {

    const [packsState, packsDispatch] = useReducer(packsReducer, { selectedPack: "" })


    return (
        <packsContext.Provider value={{packsState, packsDispatch}}>
            {props.children}
        </packsContext.Provider>
    )
}

export function usePacks() {
    const context = useContext(packsContext);
    if (context === undefined) {
        throw new Error("usePacks must be used within a PacksProvider");
    }
    return context;
}

export default PacksProvider;
