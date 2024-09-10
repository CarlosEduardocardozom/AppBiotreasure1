//  Lida com toda a comunicação com o servidor (API REST)

async function lerAnimais() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/animais');
    return await response.json();
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function adicionarAnimal(animal) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/new-animal', 
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          nome: animal.nome,
          cientifico: animal.cientifico,
      })
    });

    return response.status === 201; // Retorna 'true' se o status for 201
  } catch (error) {
    console.log(error);
    return response.status === 404; // Retorna 'false' se o status for 404
  }
}

async function editarAnimal(animal) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/edit-animal/' + animal.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: animal.nome,
        cientifico: animal.cientifico,
      })
    });
    return response.status === 201; // Retorna 'true' se o status for 201
  } catch (error) {
    console.log(error);
    return response.status === 404; // Retorna 'false' se o status for 404
  }
}

async function removerAnimal(animal) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/delete-animal/' + animal.id, {
      method: 'DELETE'
    });
    return response.status === 201; // Retorna 'true' se o status for 201
  } catch (error) {
    console.log(error);
    return response.status === 404; // Retorna 'false' se o status for 404
  }
}

async function lerCoordenadas() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/coordenadas');
    return await response.json();
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function adicionarCoordenadas(coordenada) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/new-coordenada', 
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          latitude: coordenada.latitude,
          longitude: coordenada.longitude,
          animal_id: coordenada.animal_id // Vincula coordenada ao animal
      })
    });
    return response.status === 201; // Retorna 'true' se o status for 201
  } catch (error) {
    console.log(error);
    return response.status === 404; // Retorna 'false' se o status for 404
  }
}

async function editarCoordenadas(coordenada) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/edit-coordenada/' + coordenada.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        latitude: coordenada.latitude,
        longitude: coordenada.longitude,
        animal_id: coordenada.animal_id // Mantém o vínculo do animal
      })
    });
    return response.status === 201; // Retorna 'true' se o status for 201
  } catch (error) {
    console.log(error);
    return response.status === 404; // Retorna 'false' se o status for 404
  }
}

async function removerCoordenadas(coordenada) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/delete-coordenada/' + coordenada.id, {
      method: 'DELETE'
    });

    return response.status === 201; // Retorna 'true' se o status for 201
  } catch (error) {
    console.log(error);
    return response.status === 404; // Retorna 'false' se o status for 404
  }
}

module.exports = {
  lerAnimais,
  adicionarAnimal,
  editarAnimal,
  removerAnimal,
  lerCoordenadas,
  adicionarCoordenadas,
  editarCoordenadas,
  removerCoordenadas
};
