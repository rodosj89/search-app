import { hostImages } from "../utils/config"
import DefaultImage from "../assets/poster_default_dark.jpg"

function Stripe({contents, title, type, format, i}) {

  const getImage = (c) => {
    let img, imgUrl
    switch (format) {
      case 'v2':
        img = c.images.filter(i => i.orientation === 'V')[0]
        imgUrl = `${hostImages[localStorage.getItem('env')]}/images/vod/vod/512/512/0/0/${img.suffix}.${img.format}`
        return imgUrl
      case 'v1':
        img = c.images.filter(i => parseFloat(i.ratio) < 1)[0]
        imgUrl = img && img.imageUrl || DefaultImage
        return imgUrl
      default:
        return undefined
    }
  }

  return (
    <>
      <div key={i} className='w-full pr-4'>
        <p id={`${type}-title`} className='font-semibold text-white text-xl'>{title}</p>
        <div id={`${type}-strip`} className='mt-1 mb-6 inline-flex overflow-x-auto w-full pr-4'>
          { contents.map((c,j) => {
            let imgUrl = getImage(c)
            return <div key={`${title}-${j}`} className='flex-shrink-0 flex items-center h-56'>
              <div className='relative h-44 w-32 object-cover mx-2 group'>
                <h3 className='absolute ml-1 p-1 text-lg w-32 text-white group-hover:invisible bg-origin-padding bg-gradient-to-br from-green-900 to-transparent from-60% opacity-70 rounded-t-md'>{c.title.default || c.title}</h3>
                <img 
                  src={imgUrl} key={`img-${j}`}
                  className='w-full h-full rounded-md cursor-pointer group-hover:shadow-md group-hover:shadow-default group-hover:scale-125 group-hover:mx-10 group-hover:ml-0  mx-1 duration-300'
                  alt={c.title.default || c.title} />
              </div>
            </div>
          })
        }
        </div>
      </div>
    </>
  )
}

export default Stripe