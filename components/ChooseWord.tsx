import { useContext, useState } from "react";
//description
import {
  checkboxType,
  checkboxes,
  selectInput,
  selectType,
} from "@/descriptions/RoomInputs";
//components
import Checkbox from "./DataInput/Checkbox";
import Select from "./DataInput/Select";
import Input from "./DataInput/Input";
//types
import type { WordToGuess } from "@/types/socket";
import type { socketContextTypes } from "@/types/context";
//context
import { SocketContext } from "@/context/SocketContext";
//utils
import { customWordToGuessValidation } from "@/utils/room";

type wordType = {
  wordToGuess: WordToGuess;
  [key: string]: any;
  language: string;
  customWord: boolean;
  customCategory: string;
};

type ChooseWord = { playersLimit: number; currentPlayerId: string };

const ChooseWord = ({ playersLimit, currentPlayerId }: ChooseWord) => {
  const { socket, room }: socketContextTypes = useContext(SocketContext);

  const [word, setWord] = useState<wordType>({
    wordToGuess: {
      word: "",
      translation: "",
      original: "",
      category: "",
    },
    customCategory: "",
    language: "polski",
    customWord: false,
    difficulty: 6,
  });

  const customWordCheckbox = checkboxes.filter(
    (checkbox) => checkbox.name === "customWord"
  );

  const playerWhoChoosesWordIndex = room.rounds[
    room.currentRound
  ].players.findIndex((player) => player.id === currentPlayerId);

  const setWordToGuess = () => {
    if (
      word.customWord &&
      !customWordToGuessValidation({
        playersLimit,
        wordToGuess: word.wordToGuess,
        customCategory: word.customCategory,
      })
    ) {
      return;
    }

    socket!.emit("room:setNewWordToGuess", {
      roomId: room.roomId,
      ...word,
      playerIndex: playerWhoChoosesWordIndex,
    });
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === "category") {
      setWord({
        ...word,
        wordToGuess: {
          ...word.wordToGuess,
          category: e.target.value,
        },
      });
    } else {
      setWord({ ...word, [e.target.name]: e.target.value });
    }
  };
  return (
    <div className="flexCenter flex-col text-sm">
      <h1 className="text-accent">Wybierz słowo</h1>
      <div className="form-control grid grid-cols-1 gap-5 text-primary-content min-w-1/2">
        {customWordCheckbox.map(
          ({ label, name, disabledFn, disabledLabel }: checkboxType) => (
            <Checkbox
              key={name}
              label={label}
              checked={word[name]}
              disabled={disabledFn(playersLimit)}
              disabledLabel={disabledLabel ? disabledLabel : ""}
              onChange={(e) => setWord({ ...word, [name]: e.target.checked })}
              name={name}
            />
          )
        )}
        {selectInput.map((select: selectType) => (
          <Select
            key={select.name}
            {...select}
            invisible={select.InvisibleFn(word.customWord)}
            onChange={handleChange}
          />
        ))}
        {word.customWord && (
          <Input
            value={word.wordToGuess.word}
            placeholder="Słowo do odgadnięcia"
            label="Słowo do odgadnięcia"
            ariaLabel="Słowo do odgadnięcia"
            onChange={(e) =>
              setWord({
                ...word,
                wordToGuess: {
                  ...word.wordToGuess,
                  word: e.target.value,
                  original: e.target.value,
                },
              })
            }
          />
        )}
        {word.customWord && word.category === "Inna" && (
          <Input
            value={word.customCategory}
            placeholder="Inna kategoria"
            label="Inna kategoria"
            ariaLabel="Inna kategoria"
            maxLength={25}
            onChange={(e) =>
              setWord({
                ...word,
                customCategory: e.target.value,
              })
            }
          />
        )}
        <button
          aria-label="wybierz słowo do odgadnięcia"
          onClick={setWordToGuess}
          className="btn btn-primary  text-primary-content w-full mt-4"
        >
          Zatwierdź
        </button>
      </div>
    </div>
  );
};

export default ChooseWord;
