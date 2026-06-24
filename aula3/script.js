const form = document.querySelector('#form-user')
const input = document.querySelector('#input-user')
const lista = document.querySelector('#lista-user')
const url = 'https://crudcrud.com/api/a4138494e8684fd884c5bf32bfe0ab8f/users' //sempre que puder, atualize o link no site crudcrud.com e pegue outro link adicionando /users no final. A versão gratuita não dura muito tempo. 
const loadContainer = document.querySelector('#loading')
const buttonCadastrar = document.querySelector('#button-cadastrar')
let isLoading = false
window.addEventListener('load', () => {
    showUsers()
})



const showUsers = () => {
    fetch(url)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        for(const user of data) {
            let li = document.createElement('li')
            let divContainer = document.createElement('div')
            let divButtons = document.createElement('div')
            let p = document.createElement('p')
            let buttonEdit = document.createElement('button')
            let buttonDelete = document.createElement('button')

            divContainer.classList.add('div-container')
            buttonEdit.textContent = 'Edit'
            buttonDelete.textContent = 'Delete'
            p.textContent = user.nome
            divButtons.append(buttonEdit, buttonDelete)
            divContainer.append(p, divButtons)
            li.append(divContainer)
            lista.append(li)
            
            buttonEdit.addEventListener('click', () => {
                let newNome = prompt("Digite o novo nome: ")
                
                if (newNome) {
                editarUser(user._id, newNome);
                }
            })

            buttonDelete.addEventListener('click', () => {
                deletarUser(user._id, user.nome)
            })
        }
        console.log(data)
    })

}

const criarUserFetch = (nome) => {
    loading()
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome
        })
    })
    .then(() => {
        window.location.reload()
        notLoading()
    })
}

const editarUser = (userId, newNome) => {
    if(userId) {
        fetch(`${url}/${userId}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                nome: newNome
            })
        })
        .then(() => {
            window.location.reload()
        })
    }
}

const deletarUser = (userId, userName) => {
    if(userId) {
        fetch(`${url}/${userId}`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            alert(`Usuário: ${userName} deletado!!`)
            window.location.reload()
        })
    }
}

const loading = () => {
    isLoading = true
    lista.style.display = 'none'
    loadContainer.style.display = 'block'
    buttonCadastrar.setAttribute('disabled', 'true')
}

const notLoading = () => {
    isLoading = false
    lista.style.display = 'block'
    loadContainer.style.display = 'none'
    buttonCadastrar.removeAttribute('disabled')
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    criarUserFetch(input.value)
})