/**
 * Lida com toda a comunicação com o servidor (API REST)
 * Versão falsa para testes
 */
async function lerAnimais() {
  return [
    {
      id: 1,
      nome: 'Onça-Pintada',
      cientifico: 'Panthera onca',
      latitude:'-19.5810', 
      longitude:'-57.0041'
    },
    {
      id: 2,
      nome: 'Capivara',
      cientifico: 'Hydrochoerus hydrochaeris',
      latitude:'-19.5810',
      longitude:'-57.0041'
    },
    {
      id: 3,
      nome: 'Arara-Azul',
      cientifico:'Anodorhynchus hyacinthinus',
      latitude:'-18.0004',
      longitude:'-57.5557'
    }
  ]
}

async function adicionarAnimal(animal) {
  return true
}

async function editarAnimal(animal) {
  return true
}

async function removerAnimal(animal) {
  return true
}

module.exports = {
  lerAnimais,
  adicionarAnimal,
  editarAnimal,
  removerAnimal
}