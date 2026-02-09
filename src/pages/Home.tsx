import { useState } from "react";
import { charactersArray } from "../assets/characters";
import type { Character } from "./CardGenerator";

export const Home = () => {
	const [round, setRound] = useState(1);
	const [characters, setCharacters] = useState(charactersArray);
	const [drawnCharacters, setDrawnCharacters] = useState<Character[]>([]);
	const [drawnCharacter, setDrawnCharacter] = useState<Character>();

	function draw() {
		if (characters.length === 0) return;
		const index = Math.floor(Math.random() * characters.length);
		const currentRolledCharacter = characters[index];
		setDrawnCharacter(currentRolledCharacter);
		setDrawnCharacters((prev) => [...prev, currentRolledCharacter]);
		setCharacters((prev) => prev.filter((_, i) => i !== index));
	}

	function startNewRound() {
		setRound((prev) => prev + 1);
		setDrawnCharacters([]);
		setCharacters(charactersArray);
	}

	return (
		<div>
			<h1 className="text-center text-6xl mb-4">
				Bingo da Liesel - {round}
				{"\u00AA"} Rodada
			</h1>
			<div className="flex justify-between mx-20 mb-4">
				<button
					className="border w-40 text-2xl rounded-lg text-center py-1 hover:bg-pink-400 hover:text-white duration-300 cursor-pointer"
					type="button"
					onClick={draw}
				>
					Sortear
				</button>
				<button
					className="border w-40 text-2xl rounded-lg text-center py-1 hover:bg-pink-400 hover:text-white duration-300 cursor-pointer"
					type="button"
					onClick={startNewRound}
				>
					Nova Rodada
				</button>
			</div>
			<div className="grid grid-cols-10 mx-20 mb-20">
				{charactersArray
					.sort((a, b) => a.name.localeCompare(b.name))
					.map((character) => {
						return (
							<div
								data-active={drawnCharacters.includes(character)}
								className="border w-full h-full flex flex-col items-center justify-center hover:opacity-75 duration-300 data-[active=true]:brightness-50 data-[active=true]:grayscale"
								key={character.name}
							>
								<img
									width={60}
									src={`identity/${character.name}.webp`}
									className="w-full"
									alt=""
								/>
								<h1 className="text-3xl w-full border-t border-black py-1 text-center bg-pink-400 text-white">
									{character.name}
								</h1>
							</div>
						);
					})}
			</div>
			{drawnCharacter && (
				<div
					className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100 flex items-center justify-center"
					onClick={() => setDrawnCharacter(undefined)}
				>
					<div
						className="bg-white shadow-2xl rounded-lg overflow-hidden w-140"
					>
						<h2 className="text-center bg-pink-400 text-white text-xl py-1">
							Resultado do sorteio
						</h2>

						<img
							src={`identity/${drawnCharacter.name}.webp`}
							className="w-full h-auto"
							alt={drawnCharacter.name}
						/>

						<h1 className="text-3xl w-full border-t border-black py-2 text-center bg-pink-400 text-white font-bold">
							{drawnCharacter.category} - {drawnCharacter.name}
						</h1>
						<button
							className="w-full py-3 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 duration-300 cursor-pointer"
							onClick={() => setDrawnCharacter(undefined)}
						>
							Fechar
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
