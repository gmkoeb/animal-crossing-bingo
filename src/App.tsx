import { useEffect, useState } from 'react'
import './index.css'
import { charactersArray } from './assets/characters'

interface Character {
  name: string
  category: string
}

function App() {
  const [characters, setCharacters] = useState<Character[]>([])

  function shuffleArray(array: Character[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    const bingoArray = shuffleArray(charactersArray).slice(0, 25)
    bingoArray[12] = {"name": "Free", "category": "Free"}
    setCharacters(bingoArray)
  }, [])

  return (
    <div className='grid grid-cols-4'>
      <div className='grid grid-cols-5 mx-10 my-20'>
        <div className='flex text-6xl absolute gap-11.5 ml-6 -translate-y-20'>
          <p>B</p>
          <p>I</p>
          <p>N</p>
          <p>G</p>
          <p>O</p>
        </div>
        {characters.map(character => {
          return (
            <div className='border items-center justify-center text-center flex flex-col' key={character.name}>
              {character.name === "Free" ? 
                <div className='w-full'>
                  <h1 className='text-center text-2xl font-bold text-green-400'>{character.name}</h1>
                  <img width={60} src={`images/${character.name}.webp`} className='mb-2' alt="" />
                </div>
                :
                <>
                  <h1 className='text-center my-2'>{character.name}</h1>
                  <img width={30} src={`images/${character.name}.webp`} className='mb-2' alt="" />
                </>
              }
            </div>
          )
        })}
      </div>
      <div className='grid grid-cols-5 mx-10 my-20'>
        <div className='flex text-6xl absolute gap-11.5 ml-6 -translate-y-20'>
          <p>B</p>
          <p>I</p>
          <p>N</p>
          <p>G</p>
          <p>O</p>
        </div>
        {characters.map(character => {
          return (
            <div className='border items-center justify-center text-center flex flex-col' key={character.name}>
              {character.name === "Free" ? 
                <div className='w-full'>
                  <h1 className='text-center text-2xl font-bold text-green-400'>{character.name}</h1>
                  <img width={60} src={`images/${character.name}.webp`} className='mb-2' alt="" />
                </div>
                :
                <>
                  <h1 className='text-center my-2'>{character.name}</h1>
                  <img width={30} src={`images/${character.name}.webp`} className='mb-2' alt="" />
                </>
              }
            </div>
          )
        })}
      </div>
      <div className='grid grid-cols-5 mx-10 my-20'>
        <div className='flex text-6xl absolute gap-11.5 ml-6 -translate-y-20'>
          <p>B</p>
          <p>I</p>
          <p>N</p>
          <p>G</p>
          <p>O</p>
        </div>
        {characters.map(character => {
          return (
            <div className='border items-center justify-center text-center flex flex-col' key={character.name}>
              {character.name === "Free" ? 
                <div className='w-full'>
                  <h1 className='text-center text-2xl font-bold text-green-400'>{character.name}</h1>
                  <img width={60} src={`images/${character.name}.webp`} className='mb-2' alt="" />
                </div>
                :
                <>
                  <h1 className='text-center my-2'>{character.name}</h1>
                  <img width={30} src={`images/${character.name}.webp`} className='mb-2' alt="" />
                </>
              }
            </div>
          )
        })}
      </div>
      <div className='grid grid-cols-5 mx-10 my-20'>
        <div className='flex text-6xl absolute gap-11.5 ml-6 -translate-y-20'>
          <p>B</p>
          <p>I</p>
          <p>N</p>
          <p>G</p>
          <p>O</p>
        </div>
        {characters.map(character => {
          return (
            <div className='border items-center justify-center text-center flex flex-col' key={character.name}>
              {character.name === "Free" ? 
                <div className='w-full'>
                  <h1 className='text-center text-2xl font-bold text-green-400'>{character.name}</h1>
                  <img width={60} src={`images/${character.name}.webp`} className='mb-2' alt="" />
                </div>
                :
                <>
                  <h1 className='text-center my-2'>{character.name}</h1>
                  <img width={30} src={`images/${character.name}.webp`} className='mb-2' alt="" />
                </>
              }
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
