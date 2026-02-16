import { useEffect, useState } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { charactersArray } from "../assets/characters";
import { positions, type BingoCategory } from "../assets/positions";

export interface Character {
  name: string;
  category: BingoCategory;
  url?: string
}

interface Card {
  characters: Character[];
  hash: string;
}

export const CardGenerator = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  // --- Logic Functions (unchanged from your original) ---
  function shuffleArray(array: Character[]) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  function generateCardByCategory() {
    const card: Card = { characters: [], hash: "" };
    Object.keys(positions).forEach((category) => {
      const filteredCharacters = shuffleArray(
        charactersArray.filter((char) => char.category === category)
      );
      positions[category as BingoCategory].forEach((position) => {
        const randomCharacter = filteredCharacters.pop();
        if (randomCharacter) card.characters[position] = randomCharacter;
      });
    });
    return card;
  }

  function generateBingoCards(quantity: number) {
    const cardsArray: Card[] = [];
    const hashes: Set<string> = new Set();
    while (cardsArray.length < quantity) {
      const card = generateCardByCategory();
      card.characters[12] = { name: "Free", category: "N", url: "https://static.wikia.nocookie.net/animalcrossing/images/5/56/AC_Isabelle_7XU6aGu.17345b1513ac044897cfc243542899dce541e8dc.9afde10b.png/revision/latest?cb=20180317141121" };
      const hash = card.characters.map((c) => c.name).join("-");
      if (!hashes.has(hash)) {
        hashes.add(hash);
        card.hash = hash;
        cardsArray.push(card);
      }
    }
    setCards(cardsArray);
  }

  // --- The Excel Export Function ---
  const exportToExcel = async () => {
    setIsExporting(true);
    const workbook = new ExcelJS.Workbook();
    
    // 1. Criar a aba "Villagers" (Base de Dados)
    const dbSheet = workbook.addWorksheet("Villagers");
    dbSheet.columns = [
      { header: "Name", key: "name", width: 20 },
      { header: "URL", key: "url", width: 50 }
    ];

    // Adicionar todos os villagers únicos à lista
    charactersArray.forEach(char => {
      dbSheet.addRow({ name: char.name, url: char.url });
    });

    // 2. Criar a aba "Bingo Cards"
    const sheet = workbook.addWorksheet("Bingo Cards");
    sheet.columns = [{ width: 22 }, { width: 22 }, { width: 22 }, { width: 22 }, { width: 22 }];

    let rowOffset = 1;

    for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
      const card = cards[cardIndex];

      // Header B-I-N-G-O
      const headerRow = sheet.getRow(rowOffset);
      headerRow.values = ["B", "I", "N", "G", "O"];
      headerRow.height = 30;
      headerRow.eachCell(c => { c.font = { bold: true, size: 16 }; c.alignment = { horizontal: 'center' }; });

      for (let r = 0; r < 5; r++) {
        const nameRowNum = rowOffset + 1 + (r * 2);
        const imgRowNum = nameRowNum + 1;

        sheet.getRow(nameRowNum).height = 20;
        sheet.getRow(imgRowNum).height = 100; // Espaço para a imagem aparecer

        for (let c = 0; c < 5; c++) {
          const charIndex = r * 5 + c;
          const character = card.characters[charIndex];
          const colLetter = String.fromCharCode(65 + c); // Converte 0 em 'A', 1 em 'B', etc.

          // Célula do Nome
          const nameCell = sheet.getCell(`${colLetter}${nameRowNum}`);
          nameCell.value = character.name;
          nameCell.alignment = { horizontal: 'center' };
          nameCell.border = { top: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } };

          // Célula da Imagem (Com a Fórmula solicitada)
          const imgCell = sheet.getCell(`${colLetter}${imgRowNum}`);
          
          // A fórmula aponta para a célula de nome imediatamente acima (nameRowNum)
          imgCell.value = {
            formula: `=IMAGE(VLOOKUP(${colLetter}${nameRowNum}, Villagers!$A:$B, 2, FALSE))`,
            result: undefined 
          };

          imgCell.alignment = { horizontal: 'center', vertical: 'middle' };
          imgCell.border = { bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } };
        }
      }
      rowOffset += 13;
    }

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "Bingo_Villagers.xlsx");
    setIsExporting(false);
  };

  useEffect(() => {
    generateBingoCards(132);
  }, []);

  return (
    <div className="p-10 text-center bg-cover bg-center bg-no-repeat min-h-screen">
      <button 
        onClick={exportToExcel}
        disabled={isExporting}
        className="px-10 py-5 bg-blue-600 text-white font-black text-xl rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:bg-gray-400"
      >
        {isExporting ? "PREPARING EXCEL..." : "DOWNLOAD BINGO EXCEL"}
      </button>
    </div>
  );
};