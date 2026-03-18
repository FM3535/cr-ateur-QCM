// script.js
document.addEventListener('DOMContentLoaded', function() {
    const levelSelector = document.getElementById('level-selector');
    const addQuestionBtn = document.getElementById('add-question-btn');
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    const questionsContainer = document.getElementById('questions-container');
    const quizPreview = document.getElementById('quiz-preview');

    let questions = [];

    // Ajouter une nouvelle question
    addQuestionBtn.addEventListener('click', function() {
        const questionId = 'question-' + Date.now();
        const questionCard = document.createElement('div');
        questionCard.className = 'question-card';
        questionCard.innerHTML = `
            <h3>Question ${questions.length + 1}</h3>
            <input type="text" placeholder="Énoncé de la question" id="${questionId}-text">
            <div class="options">
                <input type="text" placeholder="Option A" id="${questionId}-optionA">
                <input type="text" placeholder="Option B" id="${questionId}-optionB">
                <input type="text" placeholder="Option C" id="${questionId}-optionC">
                <input type="text" placeholder="Option D" id="${questionId}-optionD">
            </div>
            <input type="text" placeholder="Réponse correcte (A, B, C ou D)" id="${questionId}-answer">
            <button class="delete-btn" data-id="${questionId}">Supprimer</button>
        `;
        questionsContainer.appendChild(questionCard);

        // Ajouter la question au tableau
        questions.push({ id: questionId });
    });

    // Supprimer une question
    questionsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            const questionId = e.target.getAttribute('data-id');
            const questionCard = document.querySelector(`.question-card [data-id="${questionId}"]`).parentElement;
            questionCard.remove();
            questions = questions.filter(q => q.id !== questionId);
            updatePreview();
        }
    });

    // Mettre à jour l'aperçu du QCM
    function updatePreview() {
        quizPreview.innerHTML = '';
        questions.forEach((question, index) => {
            const questionText = document.getElementById(`${question.id}-text`).value;
            const optionA = document.getElementById(`${question.id}-optionA`).value;
            const optionB = document.getElementById(`${question.id}-optionB`).value;
            const optionC = document.getElementById(`${question.id}-optionC`).value;
            const optionD = document.getElementById(`${question.id}-optionD`).value;

            if (questionText) {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-question';
                previewItem.innerHTML = `
                    <h4>Question ${index + 1}</h4>
                    <p>${questionText}</p>
                    <ul>
                        <li>A) ${optionA}</li>
                        <li>B) ${optionB}</li>
                        <li>C) ${optionC}</li>
                        <li>D) ${optionD}</li>
                    </ul>
                `;
                quizPreview.appendChild(previewItem);
            }
        });
    }

    // Mettre à jour l'aperçu à chaque modification
    questionsContainer.addEventListener('input', updatePreview);

    // Exporter en PDF (simulé)
    exportPdfBtn.addEventListener('click', function() {
        alert('Fonctionnalité d\'export en PDF à implémenter avec une bibliothèque comme jsPDF.');
    });
});

