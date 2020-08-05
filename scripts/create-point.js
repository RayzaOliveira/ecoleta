// () => {} , Função anonima ou Arrow function
function populateUFs() {
  const ufSelect = document
  .querySelector ("select[name=uf]")
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  // .then( (res) => { return res.json() }) , Sem abreviação
  .then( res => res.json() )
  .then( states => {
    // ufSelect.innerHTML = ufSelect.innerHTML + , sem abreviação(concatenado) Pegue vc msm e some a esse resultado

     
    for( const state of states ) {
      // ${} , interpola
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }
  })

}

populateUFs()

function getCities(event) {
  const citySelect = document.querySelector ("[name=city]")
  const stateInput = document.querySelector ("[name=state]")


  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  fetch(url)
  .then( res => res.json() )
  .then( cities => {
        for( const city of cities ) {
      citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
    }
    citySelect.disabled = false
  })
}


document
  .querySelector ("select[name=uf]")
  .addEventListener("change", getCities)