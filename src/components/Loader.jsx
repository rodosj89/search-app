import loader from '../assets/loader.webp'

function Loader() {
    return (
        <div className="flex justify-center items-center h-screen">
            <img src={loader} alt="loading" width={"200px"} />
            <h1 className="text-4xl font-bold text-gray-700">Cargando...</h1>
        </div>
    )
}

export default Loader;