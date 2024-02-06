const quizElement = document.querySelectorAll("#quizelement");
        
        function checkAnswer(questionId, selectedOptionIndex) {
          const question = questions.find(q => q._id === questionId);
          const questionIndex = questions.indexOf(question);
          const answerIndex = question.answer;
          const resultElement = document.getElementById(`result-${questionId}`);
      
          if (selectedOptionIndex === answerIndex) {
    resultElement.textContent = "✓";
    resultElement.classList.remove("incorrect");
    resultElement.classList.add("correct");
    quizElement[questionIndex].style.backgroundColor = "rgb(171, 247, 142)";
  } else {
    resultElement.textContent = "✕";
    resultElement.classList.remove("correct");
    resultElement.classList.add("incorrect");
    quizElement[questionIndex].style.backgroundColor = "rgb(255, 168, 168)";
  }

  // Show the result element
  resultElement.style.opacity = 1;
  resultElement.style.transform = "none";
        }

        // Add event listeners to radio inputs
        const radioInputs = document.querySelectorAll('input[type="radio"]');
            radioInputs.forEach(input => {
            input.addEventListener('change', () => {
            const questionId = input.getAttribute('name');
            const selectedOptionIndex = input.value;
            checkAnswer(questionId, selectedOptionIndex);
          });
        });

        function toggleOptions(event, questionIndex) {
    const options = document.getElementById(`options${questionIndex}`);
    if (options) {
      options.style.display = options.style.display === 'none' ? 'block' : 'none';
    }
    event.stopPropagation();
  }

  // Close options dropdown when clicking outside
  window.addEventListener('click', function(event) {
    const optionsLists = document.querySelectorAll('[id^="options"]');
    optionsLists.forEach(function(options) {
      if (event.target !== options && !options.contains(event.target)) {
        options.style.display = 'none';
      }
    });
  });