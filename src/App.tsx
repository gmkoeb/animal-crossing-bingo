import { useEffect, useState } from 'react'
import './index.css'
import { charactersArray } from './assets/characters'
import { positions } from './assets/positions'

type BingoCategory = "B" | "I" | "N" | "G" | "O"

export interface Character {
  name: string
  category: BingoCategory
}

function App() {
  const [cards, setCards] = useState<Character[][]>([[]])

  function shuffleArray(array: Character[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function generateCardByCategory() {
    const categories: BingoCategory[] = ["B", "I", "N", "G", "O"]
    const card: Character[] = []
    categories.forEach(category => {
      const filteredCharacters = charactersArray.filter(filteredCharacter => {
        return filteredCharacter.category === category
      })
      positions[category].forEach(position => {
        const randomCharacter = shuffleArray(filteredCharacters).pop()
        if (randomCharacter){
          card[position] = randomCharacter
        }
      })
    })
    return card
  }
  
  function generateBingoCards(quantity: number){
    const cardsArray: Character[][] = []
    for (let i = 0; i < quantity; i++){
      const card = generateCardByCategory()
      card[12] = {"name": "Free", "category": "N"}
      cardsArray.push(card)
    }
    setCards(cardsArray) 
  }

  useEffect(() => {
    generateBingoCards(10)
  }, [])

  return (
    <div className='grid grid-cols-4'>
      {cards.map(card => {
        return (
          <div className='grid grid-cols-5 mx-10 my-20'>
            <div className='flex text-6xl absolute gap-11.5 ml-6 -translate-y-20'>
              <p>B</p>
              <p>I</p>
              <p>N</p>
              <p>G</p>
              <p>O</p>
          </div>
          {card.map(character => {
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
        )
      })}
    </div>
  )
}

export default App
