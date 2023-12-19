function Pill(props) {

    const {
      pack = {},
      handleClick = () => {}
    } = props;

    return (
        <span 
        className="px-3 py-0.5 rounded-full text-sm font-medium leading-5 text-gray-700 bg-gray-100 mr-2 cursor-pointer"
        onClick={ () => handleClick(pack) }
        >
            { pack.name }
        </span>
    )
}

export default Pill;