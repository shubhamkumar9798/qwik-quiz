import {
  component$,
  useSignal,
  $,
  useStylesScoped$,
} from "@builder.io/qwik";

import styles from "./style.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  const questions = [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language",
      ],
      answer: "Hyper Text Markup Language",
    },
    {
      question: "Which language is used for styling web pages?",
      options: ["HTML", "Python", "CSS", "C++"],
      answer: "CSS",
    },
    {
      question: "Which is a JavaScript framework?",
      options: ["React", "Django", "Flask", "Laravel"],
      answer: "React",
    },
  ];

  const currentQuestion = useSignal(0);
  const score = useSignal(0);
  const showScore = useSignal(false);

  const checkAnswer = $((option: string) => {
    if (option === questions[currentQuestion.value].answer) {
      score.value++;
    }

    const nextQuestion = currentQuestion.value + 1;

    if (nextQuestion < questions.length) {
      currentQuestion.value = nextQuestion;
    } else {
      showScore.value = true;
    }
  });

  return (
    <div class="quiz-container">
      <h1>Mini Quiz App</h1>

      {showScore.value ? (
        <div>
          <h2>
            Your Score: {score.value} / {questions.length}
          </h2>

          <button
            class="restart-button"
            onClick$={() => {
              currentQuestion.value = 0;
              score.value = 0;
              showScore.value = false;
            }}
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <h2>
            Question {currentQuestion.value + 1} / {questions.length}
          </h2>

          <p>{questions[currentQuestion.value].question}</p>

          {questions[currentQuestion.value].options.map((option) => (
            <button
              key={option}
              class="quiz-button"
              onClick$={() => checkAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});