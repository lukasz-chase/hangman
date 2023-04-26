const TipsAndStrategies = () => {
  return (
    <div className="w-full flexCenter my-10">
      <div className="w-3/4 flexCenter gap-5 flex-col">
        <h1 className="text-primary-content uppercase font-bold">
          HANGMAN TIPS & STRATEGIES
        </h1>
        <span>
          <b className="text-primary-content pr-2">Use your vowels</b>A
          excellent place to start is by looking at vowels. Since there are just
          5, you may rapidly fill in some of the blanks. They might even assist
          you in making a quick guess at the solution. For instance, if you
          start with the letter A and the word looks like this: "_A_A_A," you
          might be able to get the answer right away just by looking at the
          first letter.
        </span>
        <span>
          <b className="text-primary-content pr-2">Etaoin Shrdlu.</b>
          Two words called "Etaoin shrdlu" list the most frequently used letters
          in the English language in descending order of frequency. The letter
          "E" is used the most frequently, "t" is used the second-most
          frequently, etc. Try a couple letters from this list after you've
          tried your vowels to check whether the word contains them.
        </span>
        <span>
          <b className="text-primary-content pr-2">Investigate phrases.</b>
          Instead of concentrating on the letters when attempting to predict a
          sentence, break it apart and examine each word separately. If you can
          correctly predict just one word, you might be able to figure out the
          other words in the proverb. For additional assistance, you may also
          use the window's tip. Remember to bring your Js and Zs. J and Z are
          notorious for causing people problems. Both of these are quite
          uncommon, and it's not always clear when you need one to finish a word
          or sentence. Though you shouldn't guess a Z or a J right away, keep
          them in mind as you play.
        </span>
        <span>
          <b className="text-primary-content pr-2">
            Learning the most challenging and prevalent Hangman words can be
            useful.
          </b>
          Learn some useful advice on how to improve your Hangman strategy.
          Which Hangman words are some of the most challenging? Jazz is among
          the more challenging Hangman words. Jazz is fantastic since it uses J
          and Z, two of the alphabet's least common letters. Additionally, the
          fact that it only has 3 letters makes it more difficult for players to
          predict. Words that don't typically contain the vowels A, E, I, O, and
          U are also excellent choices. Psych and synth are two excellent
          examples. Both lack vowels, making it difficult for opponents to
          identify what they are.
        </span>
        <h1 className="text-primary-content uppercase font-bold">
          What do you learn from playing Hangman?
        </h1>
        <span>
          Hangman teaches you spelling, vocabulary, and other related language
          skills. Hangman can also help expand your topical knowledge
        </span>
      </div>
    </div>
  );
};

export default TipsAndStrategies;
