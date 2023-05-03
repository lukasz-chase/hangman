//translation
import { translateHandler } from "@/utils/room";
import { useEffect, useState } from "react";

const Translate = ({ text, language }: { text: string; language: string }) => {
  const [translatedText, setTranslatedText] = useState(text);
  useEffect(() => {
    translateHandler(text, language)
      .then((data: string) => setTranslatedText(data))
      .catch((err: any) => console.log(err));
  }, []);
  return <div>{translatedText}</div>;
};

export default Translate;
