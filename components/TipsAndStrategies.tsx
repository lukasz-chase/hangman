const TipsAndStrategies = () => {
  return (
    <div className="w-full flexCenter my-10">
      <div className="w-3/4 flexCenter gap-5 flex-col text-[#A6ADBB]">
        <h1 className="text-primary-content uppercase font-bold text-center">
          HANGMAN - TIPS AND STRATEGIES
        </h1>
        <span>
          <b className="text-primary-content pr-2">Use vowels.</b>
          One of the best ways to start the game is with vowels. Since there are
          only 5 of them, you can quickly fill in some of the gaps. They might
          even help you guess the solution quickly. For example, if you start
          with the letter A and the word looks like this: "_A_A_A," you might be
          able to guess the answer right away just by looking at the first
          letter.
        </span>
        <span>
          <b className="text-primary-content pr-2">Examine the word.</b>
          Instead of focusing on letters when trying to guess a sentence, break
          it down and examine each word separately. If you can guess at least
          one word, you might be able to predict other words in the sentence.
          Remember J and Z. J and Z are known for causing people trouble. Both
          of these letters are quite common, and it's rarely obvious to use
          them. However, remember not to try to guess these letters at the
          beginning, but keep them in mind.
        </span>
        <span>
          <b className="text-primary-content pr-2">
            Learning the hardest and most common Hangman words can be useful.
          </b>
          Which Hangman words are the hardest? "Jazz" is one of the tougher
          ones. "Jazz" is a fantastic word because it consists mostly of letters
          that are almost never guessed. Words that do not have the vowels A, E,
          I, O, and U are a great choice to learn.
        </span>
        <h1 className="text-primary-content uppercase font-bold text-center">
          What can we learn from playing Hangman?
        </h1>
        <span>
          Hangman teaches spelling, vocabulary, and other language-related
          skills. Hangman can also help expand subject-matter knowledge.
        </span>
      </div>
    </div>
  );
};

export default TipsAndStrategies;
