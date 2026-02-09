import { useState } from "react";
import { charactersArray } from "../assets/characters";
import type { Character } from "./CardGenerator";

export const Home = () => {
	const [round, setRound] = useState(1);
	const [characters, setCharacters] = useState(charactersArray);
	const [rolledCharacters, setRolledCharacters] = useState<Character[]>([])

	function roll() {
		if (characters.length === 0) return;
		const index = Math.floor(Math.random() * characters.length)
		const rolledCharacter = characters[index]
		setRolledCharacters(prev => [...prev, rolledCharacter])
		setCharacters(prev => prev.filter(character => character !== rolledCharacter))
	}

	return (
		<div>
			<h1 className="text-center text-6xl mb-4">
				Bingo da Liesel - {round}
				{"\u00AA"} Rodada
			</h1>
			<button type="button" onClick={() => roll()}>Rolar</button>
			<div className="grid grid-cols-10 mx-20 mb-20">
				{charactersArray.sort((a, b) => a.name.localeCompare(b.name)).map((character) => {
					return (
						<div
							data-active={rolledCharacters.includes(character)}
							className="border w-full h-full flex flex-col items-center justify-center data-[active=true]:brightness-25 data-[active=true]:grayscale"
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
