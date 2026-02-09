import { useEffect, useState } from "react";
import { charactersArray } from "../assets/characters";
import type { Character } from "./CardGenerator";

export const Home = () => {
	const [round, setRound] = useState(1);
	const [characters, setCharacters] = useState(charactersArray);
	const [rolledCharacters, setRolledCharacters] = useState<Character[]>([])

	function roll() {
		const index = Math.floor(Math.random() * characters.length)
		const rolledCharacter = characters[index]
		if (rolledCharacters.includes(rolledCharacter)){
			if (rolledCharacters.length < 75){
				roll()
			}
		} else {
			setRolledCharacters(prev => [...prev, rolledCharacter])
		}
	}

	useEffect(() => {
		setCharacters([...characters].sort((a, b) => a.name.localeCompare(b.name)));
	}, [])

	return (
		<div>
			<h1 className="text-center text-6xl mb-4">
				Bingo da Liesel - {round}
				{"\u00AA"} Rodada
			</h1>
			<button onClick={() => roll()}>Rolar</button>
			<div className="grid grid-cols-10 mx-20 mb-20">
				{characters.map((character) => {
					return (
						<div
							data-active={rolledCharacters.includes(character)}
							className="border w-full h-full flex flex-col items-center justify-center data-[active=true]:brightness-50 data-[active=true]:grayscale"
							key={character.name}
						>
							<img
								width={60}
								src={`identity/${character.name}.webp`}
								className="w-full"
								alt=""
							/>
							<h1 className="text-3xl w-full border-t border-black py-1 text-center bg-pink-400 text-white">{character.name}</h1>
						</div>
					);
				})}
			</div>
		</div>
	);
};
