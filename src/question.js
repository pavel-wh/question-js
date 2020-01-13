export class Question {
    static create(question) {
        return fetch('https://question-js.firebaseio.com/question.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question)
        })
            .then(response => response.json())
            .then(response => {
                question.id = response.name
                return question
            })
            .then(addToLocalStorage)
            .then(Question.renderList)
    }
    static renderList() {
        const questions = getQuestionsFromLocalStorage()
        const html = questions.length
            ?   questions.map(toCard).join('')
            :   `<p class="subtitle has-text-dark">Вы пока ничего не спрашивали...</p>`

        const list = document.getElementById('list')

        list.innerHTML = html
    }
}

function addToLocalStorage(question) {
    const all = getQuestionsFromLocalStorage()
    all.push(question)
    localStorage.setItem('questions', JSON.stringify(all))
}

function getQuestionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard(question) {
    return `
    <div class="card">
        <!--<header class="card-header">
            <p class="card-header-title">
                Вопрос
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
                <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            </a>
        </header>-->
        <div class="card-content">
            <div class="content">
                ${ question.text }
                <br>
                <time datetime="${ question.date }">${ question.date }</time>
            </div>
        </div>
        <!--<footer class="card-footer">
            <a href="#" class="card-footer-item">Delete</a>
        </footer>-->
    </div>
    <br/>
    `
}