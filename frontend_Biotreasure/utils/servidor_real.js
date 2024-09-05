/**
 * Lida com toda a comunicação com o servidor (API REST)
 */
async function lerAnimais() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/animais')
    return await response.json()
  } catch (error) {
    console.log(error)
    return false
  }
}

async function adicionarAnimal(animal) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/criarA', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: animal.nome,
        cientifico: animal.cientifico,
        latitude: animal.latitude,
        longitude:animal.longitude
      })
    })

    return response.status == 204
  } catch (error) {
    console.log(error)
    return false
  }
}

async function editarAnimal(animal) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/editarA/' + animal.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: animal.nome,
        cientifico: animal.cientifico,
        latitude: animal.latitude,
        longitude:animal.longitude
      })
    })

    return response.status == 201
  } catch (error) {
    console.log(error)
    return false
  }
}

async function removerAnimal(animal) {
  try {
    const response = await fetch('http://127.0.0.1:8000/deletar/' + animal.id, {
      method: 'DELETE'
    })

    return response.status == 204
  } catch (error) {
    console.log(error)
    return false
  }
}

module.exports = {
  lerAnimais,
  adicionarAnimal,
  editarAnimal,
  removerAnimal
}