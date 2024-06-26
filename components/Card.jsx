'use client';
import { useState, useEffect, useContext } from 'react';
import { LevelContext } from './LevelProvider';
import { ViewPreferenceContext } from './ViewPreferenceProvider';

const Card = ({ word }) => {
  const options = ['der', 'die', 'das'];
  const [word_data, set_word_data] = useState(word);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showTranslation, setshowTranslation] = useState(false);

  const { sharedState: levelState } = useContext(LevelContext);
  const { sharedState: viewPref } = useContext(ViewPreferenceContext);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;
      if (key >= '1' && key <= '3') {
        const optionIndex = parseInt(key) - 1;
        if (optionIndex < options.length) {
          checkAnswer(options[optionIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const getNewWord = async () => {
    fetch(`/api/random_word/${levelState}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        set_word_data(data);
      })
      .catch(error => {
        // return notFound()
      });
  }

  const checkAnswer = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    if (selectedOption === word_data.artikel) {
      setAnswerStatus('correct');
      setTimeout(() => {
        setAnswerStatus(null); // Reset answer status
      }, 200);
      getNewWord();
    } else {
      setAnswerStatus('incorrect');
      setTimeout(() => {
        setAnswerStatus(null); // Reset answer status
      }, 200);
    }
  }

  const getButtonClasses = (option) => {
    let classes = "";
    if (answerStatus === 'correct' && option === selectedAnswer) {
      classes = 'bg-green-500 hover:bg-green-600 text-white scale-105';
    } else if (answerStatus === 'incorrect' && option === selectedAnswer) {
      classes = 'bg-red-500 hover:bg-red-600 text-white';
    } else {
      classes = 'bg-blue-500 hover:bg-blue-600 text-white';
    }
    return classes;
  };

  return (
    <div className=" sm:w-max w-full border-gray-300 rounded-lg sm:px-10 sm:py-14 py-8 text-center z-10 drop-shadow-[0_0_0.1rem_#ffffff70]">
      <div className='h-full flex flex-col items-center justify-around'>
      <div className='mb-9'>
        <div className="flex items-start justify-center ">
            <h2 className="text-2xl font-bold">{word_data.word}</h2>
            <span className="cursor-pointer" onMouseEnter={() => setshowTranslation(true)} onMouseLeave={() =>setshowTranslation(false)}>
              {viewPref == 'Hint' && <span className=" w-4 text-sm inline-block text-blue-500 hover:text-blue-600">
                ?
              </span>
              }
            </span>
        </div>
        <p className={`font-thin mt-2 min-h-6 transition-opacity duration-500 ${showTranslation || viewPref == 'Always' ? 'opacity-100' : 'opacity-0'}`}>{(showTranslation || viewPref == 'Always') && `(${word_data.level}) ${word_data.translation}`}</p>
      </div>
        <div className="flex flex-wrap justify-center sm:gap-8 gap-5">
          {options.map((option, index) => (
            <button
              key={index}
              className={`font-semibold sm:px-6 px-6 sm:py-3 py-3 rounded-lg mb-4 transition duration-300 ease-in-out flex items-baseline gap-2 ${getButtonClasses(option)}`}
              onClick={() => checkAnswer(option)}
            >
              {option}
              <p className="text-xs font-medium opacity-80 hidden sm:block">[{index + 1}]</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
