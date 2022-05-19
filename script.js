let seuVotoPara = document.querySelector('.d-1-1 span')
let cargo = document.querySelector('.d-1-2 span')
let descricao = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d-2')
let lateral = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3')

let etapaAtual = 0
let numero = ''
let votoBranco = false
let votos = []

const comecarEtapa = () => {
    let etapa = etapas[etapaAtual]

    let numeroHtml = ''
    numero = ''
    votoBranco = false

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>'
        } else {
            numeroHtml += '<div class="numero"></div>'
        }
    }

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHtml
}
const atualizaInterface = () => {
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true
        } else {
            return false
        }
    })
    if (candidato.length > 0) {
        candidato = candidato[0]
        seuVotoPara.style.display = 'block'
        descricao.innerHTML = `Candidato: ${candidato.name}<br/>Partido: ${candidato.partido}`
        aviso.style.display = 'block'
        let fotosHtml = ''
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small">
                                 <img src="./images/${candidato.fotos[i].url}" alt="">
                                 ${candidato.fotos[i].legenda}
                              </div>`
            } else {
                fotosHtml += `<div class="d-1-image">
                                 <img src="./images/${candidato.fotos[i].url}" alt="">
                                 ${candidato.fotos[i].legenda}
                              </div>`
            }
        }
        lateral.innerHTML = fotosHtml
    } else {
        seuVotoPara.style.display = 'block'
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
        aviso.style.display = 'block'
    }
}
const clicou = (n) => {
    let elNumero = document.querySelector('.numero.pisca')
    if (elNumero !== null) {
        elNumero.innerHTML = n
        numero += `${n}`

        elNumero.classList.remove('pisca')
        if (elNumero.nextElementSibling != null) {
            elNumero.nextElementSibling.classList.add('pisca')
        } else {
            atualizaInterface()
        }
    }
}
const branco = () => {
    if (numero === '') {
        votoBranco = true
        seuVotoPara.style.display = 'block'
        numeros.innerHTML = ''
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO BRANCO</div>'
        aviso.style.display = 'block'
    } else {
        alert('Para votar em BRANCO, não pode ter digitado nenhum número!')
    }
}
const corrige = () => {
    comecarEtapa()
}
const confirma = () => {
    let etapa = etapas[etapaAtual]
    let votoConfirmado = false

    if (votoBranco === true) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'Branco'
        })
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    } else if (numero === '') {
        alert('VOTE PRIMEIRO ANTES DE CONFIRMAR O VOTO!')
    } else if (numero.length != etapa.numeros) {
        alert('DIGITE TODOS OS NÚMEROS DO CANDIDATO ANTES DE CONFIRMAR O VOTO!')
    }

    if (votoConfirmado === true) {
        etapaAtual++
        if (etapas[etapaAtual] != undefined) {
            comecarEtapa()
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>'
            console.log(votos)
        }
    }
}

comecarEtapa()