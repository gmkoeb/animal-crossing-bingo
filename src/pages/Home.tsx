import { useEffect, useState } from "react";
import { charactersArray } from "../assets/characters";
import type { Character } from "./CardGenerator";

export const Home = () => {
	const [round, setRound] = useState(1);
	const [isDrawing, setIsDrawing] = useState(false);
	const [characters, setCharacters] = useState(charactersArray);
	const [drawnCharacters, setDrawnCharacters] = useState<Character[]>([]);
	const [drawnCharacter, setDrawnCharacter] = useState<Character>();

	useEffect(() => {
		if (!isDrawing) return;
		const interval = setInterval(() => {
			const randomIndex = Math.floor(Math.random() * characters.length);
			setDrawnCharacter(characters[randomIndex]);
		}, 300);

		return () => clearInterval(interval);
	}, [isDrawing]);

	function draw() {
		if (characters.length === 0) return;

		const index = Math.floor(Math.random() * characters.length);
		const winner = characters[index];

		const placeholder = characters[Math.floor(Math.random() * characters.length)];
 	 	setDrawnCharacter(placeholder);
		
		setIsDrawing(true)

		setTimeout(() => {
			setDrawnCharacter(winner);
			setDrawnCharacters((prev) => [...prev, winner]);
			setCharacters((prev) => prev.filter((_, i) => i !== index));
			setIsDrawing(false)
		}, 5000);
	}

	function stopDraw() {
		setIsDrawing(false)
		setDrawnCharacter(undefined)
	}

	function startNewRound() {
		setRound((prev) => prev + 1);
		setDrawnCharacters([]);
		setCharacters(charactersArray);
	}

	return (
		<div>
			<div className="flex justify-between fixed bottom-10 z-100 right-10">
				<button
					className="w-42 text-lg rounded-lg text-center bg-pink-400 text-white py-1 hover:opacity-90 duration-300 cursor-pointer"
					type="button"
					onClick={draw}
				>
					Sortear
				</button>
				<h1 className="text-center text-6xl mb-4 font-bold text-white mx-5">
					Bingo da Liesel - {round}
					{"\u00AA"} Rodada
				</h1>
				<button
					className="px-10 text-lg rounded-lg text-center py-1 bg-pink-400 hover:opacity-90 duration-300 cursor-pointer text-white"
					type="button"
					onClick={startNewRound}
				>
					Nova Rodada
				</button>
			</div>
			<div className="grid grid-cols-14">
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
								<h1 className="text-[5.5vh] w-full border-t border-black text-center bg-pink-400 text-white">
									{character.name}
								</h1>
							</div>
						);
					})}
			</div>
			{drawnCharacter && (
				<div
					className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100 flex items-center justify-center"
					onClick={stopDraw}
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

							<h1 className="text-[5.5vh] w-full border-t border-black py-2 text-center bg-pink-400 text-white font-bold">
								{drawnCharacter.category} - {drawnCharacter.name}
							</h1>
							<button
								className="w-full py-3 text-[2.5vh] bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 duration-300 cursor-pointer"
								onClick={stopDraw}
							>
								Fechar
							</button>
						</div>
				</div>
			)}
		</div>
	);
};
