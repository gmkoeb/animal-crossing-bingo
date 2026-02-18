import { useEffect, useRef, useState } from "react";
import { charactersArray } from "../assets/characters";
import type { Character } from "./CardGenerator";

export const Home = () => {
	const [round, setRound] = useState(1);
	const [isDrawing, setIsDrawing] = useState(false);
	const [characters, setCharacters] = useState(charactersArray);
	const [drawnCharacters, setDrawnCharacters] = useState<Character[]>([]);
	const [drawnCharacter, setDrawnCharacter] = useState<Character>();
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	
	const clearAllTimers = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    intervalRef.current = null;
    timeoutRef.current = null;
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);
	
	function draw() {
		if (isDrawing || characters.length === 0) return;

		setIsDrawing(true);

		intervalRef.current = setInterval(() => {
			const randomIndex = Math.floor(Math.random() * characters.length);
			setDrawnCharacter(characters[randomIndex]);
		}, 300);

		timeoutRef.current = setTimeout(() => {
			finishDraw();
		}, 5000);
	}

	function finishDraw() {
		clearAllTimers();

		const index = Math.floor(Math.random() * characters.length);
		const finalCharacter = characters[index];

		setDrawnCharacter(finalCharacter);
		setDrawnCharacters((prev) => [...prev, finalCharacter]);
		setCharacters((prev) => prev.filter((_, i) => i !== index));
		setIsDrawing(false);
	}

	function stopDraw() {
    if (!isDrawing) {
      setDrawnCharacter(undefined);
      return;
    }
    finishDraw();
  }

  function startNewRound() {
    clearAllTimers();
    setIsDrawing(false);
    setRound((prev) => prev + 1);
    setDrawnCharacters([]);
    setCharacters(charactersArray);
    setDrawnCharacter(undefined);
  }

	return (
		<div>
			<div className="flex justify-between fixed bottom-10 z-100 right-10 items-center">
				<div className="flex flex-col justify-center items-center">
					<img src="drawingGif.gif" className="w-32" alt="" />
					<button
						className="w-42 text-lg rounded-lg text-center bg-pink-400 text-white py-1 hover:opacity-90 duration-300 cursor-pointer"
						type="button"
						onClick={draw}
					>
						Sortear
					</button>
				</div>
				<h1 className="text-center text-6xl mb-4 font-bold text-white mx-5">
					Bingo da Liesel - {round}
					{"\u00AA"} Rodada
				</h1>
				<div className="flex flex-col justify-center items-center">
					<img src="drawingGif.gif" className="w-32" alt="" />
					<button
						className="w-42 text-lg rounded-lg text-center py-1 bg-pink-400 hover:opacity-90 duration-300 cursor-pointer text-white"
						type="button"
						onClick={startNewRound}
					>
						Nova Rodada
					</button>
				</div>
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
