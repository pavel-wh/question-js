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
    static fetch(token) {
        if(!token) {
            return Promise.resolve('<p>У вас нет токена!</p>')
        }
        return fetch(`https://question-js.firebaseio.com/question.json?auth=${ token }`)
            .then(response => response.json())
            .then(response => {
                if(response && response.error) {
                    return `<p>${ response.error }</p>`
                }
                return response 
                    ? Object.keys(response).map(key => ({
                        ...response[key],
                        id: key
                    })) 
                    : []
            })
    }
    static listToHTML(questions) {
        if(typeof questions === 'string') {
            return `<p>Ошибка: ${ questions }</p>`
        } else {
            return questions.length
                ?   `<div class="content"><ol type="1">${ questions.map(q => `<li>${ q.text }</li>`).join('') }</ol></div>`
                :   '<p>Вопросов пока нет...</p>'
        }
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