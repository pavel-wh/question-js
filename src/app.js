import './styles.css'
import { isValid } from './utils'
import 'bulma'

const form = document.getElementById('form')
const submit = form.querySelector('input[type="submit"]')
const textarea = form.querySelector('textarea')

form.addEventListener('submit', submitFormHandler)
textarea.addEventListener('input', () => {
    submit.disabled = !isValid(textarea.value)
})

function submitFormHandler(event) {
    event.preventDefault()
    if(isValid(textarea.value)) {
        const question = {
            text: textarea.value.trim(),
            date: new Date().toJSON()
        }
        submit.disabled = true
        // Async request to server for save question
        Question.create(question)
            .then(() => {
                textarea.value = ''
            })
    } else {
        console.log('inValid')
    }
}

