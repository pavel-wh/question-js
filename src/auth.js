import { Question } from "./question"

export class Authorisation {
    static login(email, password) {
        return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ process.env.firebaseAPI }`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, 
                password, 
                returnSecureToken: true
            })
        })
            .then(response => response.json())
            .then(data => data.idToken)
    }
    static handler(event) {
        event.preventDefault()
        
        const btn = event.target.querySelector('button')
        const form = btn.parentNode
        const email = event.target.querySelector('input[type="email"]').value
        const password = event.target.querySelector('input[type="password"]').value

        btn.disabled = true
        Authorisation.login(email, password)
            .then(Question.fetch)
            .then((content) => {
                form.innerHTML = '',
                form.parentNode.querySelector('.title').innerHTML = 'Вопросы заданные вам'
                form.innerHTML = Question.listToHTML(content)
            })
            .then(() => btn.disabled = false)
    }
}