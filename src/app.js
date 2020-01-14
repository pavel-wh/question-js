import './styles.css'
import { isValid } from './utils'
import { Question } from './question'
import { Authorisation } from './auth'
import 'bulma'

const form = document.getElementById('form')
const submit = form.querySelector('input[type="submit"]')
const textarea = form.querySelector('textarea')
const modalBtn = document.getElementById('modalBtn')
const modal = document.getElementById('modal')

modalBtn.addEventListener('click', toggleModal)

window.addEventListener('load', Question.renderList)
form.addEventListener('submit', submitFormHandler)
textarea.addEventListener('input', () => {
    submit.disabled = !isValid(textarea.value)
})

function submitFormHandler(event) {
    event.preventDefault()
    if(isValid(textarea.value)) {
        const question = {
            text: textarea.value.trim(),
            date: new Date().toLocaleString()
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

function toggleModal() {
    event.preventDefault()
    modal.classList.add('is-active')
    document.querySelector('html').classList.add('is-clipped')

    modal
        .querySelector('.modal-close')
        .addEventListener('click', () => {
            modal.classList.remove('is-active')
            document.querySelector('html').classList.remove('is-clipped')
        })

    modal
        .querySelector('.modal-background')
        .addEventListener('click', () => {
            modal.classList.remove('is-active')
            document.querySelector('html').classList.remove('is-clipped')
        })

    modal
        .querySelector('#auth-form')
        .addEventListener('submit', Authorisation.handler)
}