import { useEffect, useState } from "react";
import { charactersArray } from "../assets/characters";
import { positions, type BingoCategory } from "../assets/positions";

export interface Character {
	name: string;
	category: BingoCategory;
}

interface Card {
	characters: Character[];
	hash: string;
}

export const CardGenerator = () => {
	const [cards, setCards] = useState<Card[]>([]);
	function shuffleArray(array: Character[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	function generateCardByCategory() {
		const card: Card = {
			characters: [],
			hash: "",
		};
		Object.keys(positions).forEach((category) => {
			const filteredCharacters = charactersArray.filter((filteredCharacter) => {
				return filteredCharacter.category === category;
			});
			positions[category as BingoCategory].forEach((position) => {
				const randomCharacter = shuffleArray(filteredCharacters).pop();
				if (randomCharacter) {
					card.characters[position] = randomCharacter;
				}
			});
		});
		return card;
	}

	function simpleHash(str: string): number {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = (hash << 5) - hash + str.charCodeAt(i);
			hash |= 0;
		}
		return hash;
	}

	function generateCardHash(card: Card) {
		let i = 0;
		let hash = "";
		card.characters.forEach((character) => {
			hash += simpleHash(character.name + i);
			i++;
		});
		return hash;
	}

	function generateBingoCards(quantity: number) {
		const cardsArray: Card[] = [];
		const hashes: Set<string> = new Set();
		while (cardsArray.length < quantity) {
			const card = generateCardByCategory();
			card.characters[12] = { name: "Free", category: "N" };
			card.hash = generateCardHash(card);
			if (!hashes.has(card.hash)) {
				hashes.add(card.hash);
				cardsArray.push(card);
			}
		}
		setCards(cardsArray);
	}
  
	useEffect(() => {
		generateBingoCards(25);
	}, []);

	return (
		<div className="grid grid-cols-4">
			{cards.map((card) => {
				return (
					<div key={`${card.hash}`} className="grid grid-cols-5 mx-10 my-20">
						<div className="flex text-6xl absolute gap-11.5 ml-6 -translate-y-20">
							<p>B</p>
							<p>I</p>
							<p>N</p>
							<p>G</p>
							<p>O</p>
						</div>
						{card.characters.map((character) => {
							return (
								<div
									className="border items-center justify-center text-center flex flex-col"
									key={character.name}
								>
									{character.name === "Free" ? (
										<div className="w-full">
											<h1 className="text-center text-2xl font-bold text-green-400">
												{character.name}
											</h1>
											<img
												width={60}
												src={`images/${character.name}.webp`}
												className="mb-2"
												alt=""
											/>
										</div>
									) : (
										<>
											<h1 className="text-center my-2">{character.name}</h1>
											<img
												width={30}
												src={`images/${character.name}.webp`}
												className="mb-2"
												alt=""
											/>
										</>
									)}
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};
