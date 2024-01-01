import { useEffect, useState } from "react"


export const MemeComponent = () => {

      const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
      })


      function handleChange(e) {
        const {name , value } = e.target
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        })
      }


    const [allMemeImages, setAllMemeImages] = useState([])

    useEffect(() =>{
        fetch("https://api.imgflip.com/get_memes")
            .then( res => res.json())
            .then( data => setAllMemeImages(data))
            .catch(error => console.error('Error fetching data:', error));
    },[])

    function getMemeImage(e) {
        const memeArray = allMemeImages.data.memes
        const randomIndex = Math.floor(Math.random() * allMemeImages.data.memes.length )
        const url = memeArray[randomIndex].url
   
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    
    }
   
    



  return (
    <main className="px-10 pt-20 max-w-2xl mx-auto">
            <div className="flex justify-around mb-3">
                <label htmlFor="Addtitle"  className="">Top Text</label>
                <label htmlFor="AddText" className="">Bottom Text</label>
            </div>

            <div>
                <div className="flex justify-center ">
                    
                    <input
                        type="text"
                        name="topText"
                        id="Addtitle"
                        placeholder="Add a Title"
                        className="border border-solid
                        w-6/12 px-2 py-1 rounded mr-2 text-center
                        sm:text-base
                        "
                        value={meme.topText}
                        onChange={handleChange}
                        />


                    <input
                        type="text"
                        name="bottomText"
                        id="AddText"
                        placeholder="Add a Text"
                        className="border border-solid
                        w-6/12 px-2 py-1 rounded ml-2 text-center
                        sm:text-base
                        "
                        value={meme.bottomText}
                        onChange={handleChange}
                        />
                </div>

                <button 
                    className="w-full mt-7 py-2 px-4
                    bg-gradient-to-r from-[#672280] to-[#A626D3] text-white
                    rounded font-bold  cursor-pointer sm:text-lg"
                    onClick={getMemeImage}
                    
                >Get a new meme image 🖼️
                </button>
            </div>

            <div className='relative flex items-center justify-center' >
                <img
                    src={meme.randomImage}
                    alt="" 
                    className='w-full max-w-2xl pt-20 mb-10 mx-auto'
                />

                <h2 className="absolute top-24 text-2xl font-bold text-white  font-['Anton']  drop-shadow-two tracking-wider sm:text-4xl" >{meme.topText}</h2>
                <h2 className="absolute bottom-16 text-2xl  font-bold text-white  font-['Anton']   drop-shadow-two tracking-wider sm:text-4xl">{meme.bottomText}</h2>
            </div>
    </main>
  )
}

