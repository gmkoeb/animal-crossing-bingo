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
			<div className="flex justify-between mx-60 mt-10 mb-5">
				<button
					className="w-[20vw] text-[4vh] rounded-lg text-center bg-pink-400 text-white py-1 hover:opacity-85 duration-300 cursor-pointer"
					type="button"
					onClick={draw}
				>
					Sortear
				</button>
				<h1 className="text-center text-[6vh] mb-4 font-bold text-pink-500">
					Bingo da Liesel - {round}
					{"\u00AA"} Rodada
				</h1>
				<button
					className="border px-10 text-[4vh] rounded-lg text-center py-1 hover:bg-pink-400 hover:text-white duration-300 cursor-pointer"
					type="button"
					onClick={startNewRound}
				>
					Nova Rodada
				</button>
			</div>
			<div className="grid grid-cols-15">
				{charactersArray
					.sort((a, b) => a.name.localeCompare(b.name))
					.map((character) => {
						return (
							<div
								data-active={drawnCharacters.includes(character)}
								className="border w-full h-full flex flex-col flex-1 items-center justify-center hover:opacity-90 duration-300 grayscale data-[active=true]:brightness-100 data-[active=true]:grayscale-0"
								key={character.name}
							>
								<img
									width={60}
									src={`identity/${character.name}.webp`}
									className="w-full"
									alt=""
								/>
								<h1 className="text-[110px] w-full border-t border-black text-center bg-pink-400 text-white">
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
						className="bg-white shadow-2xl rounded-lg overflow-hidden w-[40dvw]"
					>
						<h2 className="text-center text-[5vh] bg-pink-400 text-white text-xl p-5">
							Resultado do sorteio
						</h2>

						<img
							src={`identity/${drawnCharacter.name}.webp`}
							className="w-full h-auto"
							alt={drawnCharacter.name}
						/>

						<h1 className="text-[4vh] w-full border-t border-black py-2 text-center bg-pink-400 text-white font-bold">
							{drawnCharacter.category} - {drawnCharacter.name}
						</h1>
						<button
							className="w-full py-3 text-[2vh] bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 duration-300 cursor-pointer"
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
