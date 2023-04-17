import { useContext, useState } from "react";
import {
  checkboxType,
  checkboxes,
  selectInput,
  selectType,
} from "@/descriptions/RoomInputs";
import Checkbox from "./DataInput/Checkbox";
import Select from "./DataInput/Select";
import Input from "./DataInput/Input";
import { socketContextTypes } from "@/types/context";
import { SocketContext } from "@/context/SocketContext";

type wordType = {
  wordToGuess: {
    word: string;
    translation: string;
    original: string;
  };
  [key: string]: any;
  language: string;
  customWord: boolean;
};

type ChooseWord = { playersLimit: number; currentPlayerId: string };

const ChooseWord = ({ playersLimit, currentPlayerId }: ChooseWord) => {
  const { socket, room }: socketContextTypes = useContext(SocketContext);

  const [word, setWord] = useState<wordType>({
    wordToGuess: {
      word: "",
      translation: "",
      original: "",
    },
    language: "english",
    customWord: false,
  });
  const customWordCheckbox = checkboxes.filter(
    (checkbox) => checkbox.name === "customWord"
  );
  const playerWhoChoosesWordIndex = room.rounds[
    room.currentRound
  ].players.findIndex((player) => player.id === currentPlayerId);
  const setWordToGuess = () => {
    socket!.emit("room:setNewWordToGuess", {
      roomId: room.roomId,
      ...word,
      playerIndex: playerWhoChoosesWordIndex,
    });
  };
  return (
    <div className="flexCenter flex-col text-sm ">
      <h1 className="text-accent">You are chosing word this round</h1>
      <div className="form-control grid grid-cols-1 gap-5 text-primary-content min-w-1/2">
        {selectInput.map((select: selectType) => (
          <Select
            key={select.name}
            {...select}
            onChange={(e) =>
              setWord({ ...word, [select.name]: e.target.value })
            }
          />
        ))}
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
        {word.customWord && (
          <Input
            value={word.wordToGuess.word}
            placeholder="Word to guess"
            ariaLabel="input custom word"
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
        {word.customWord && word.language !== "english" && (
          <Input
            value={word.wordToGuess.translation}
            placeholder="Translation"
            ariaLabel="input custom word translation"
            toolTip="Provide translation for word to guess, it will be shown after the game is done so other players can learn what word they guessed means"
            onChange={(e) =>
              setWord({
                ...word,
                wordToGuess: {
                  ...word.wordToGuess,
                  translation: e.target.value,
                },
              })
            }
          />
        )}
        <button
          aria-label="set word to guess"
          onClick={setWordToGuess}
          className="btn btn-primary  text-primary-content w-full mt-4"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ChooseWord;
