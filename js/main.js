$(document).ready(function() {
    redirecionarPagina("sobre")
})

function redirecionarPagina(pagina) {
    $.ajax({
        url: `paginas/${pagina}.html`,
        data: { "expression": "x" },
        cache: false
    }).done(function(retornoRequestPagina) {
        $("#about-card > .card-content").html(retornoRequestPagina);
    });
}

//FORM

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};

const getMsgs = () => {
    msgs = JSON.parse(localStorage.getItem("msgs"))
    return (msgs == null) ? [] : msgs
}

const getToday = () => {
    let dateUS = new Date(Date.now())
    let dateBR = new Date(dateUS.getTime() - dateUS.getTimezoneOffset() * 60000)
    return dateBR
}

const setMsg = () => {
    return {
        name: $("#inputFormName").val(),
        email: $("#inputFormEmail").val(),
        textArea: $("#inputFormTextArea").val(),
        data: getToday()
    }
}

function validarForm(msg) {
    let errosValidacao = []
    if (msg.name.isEmpty()) {
        errosValidacao.name = 'Insira seu nome'
    }
    if (msg.email.isEmpty()) {
        errosValidacao.email = 'Insira seu email'
    }
    if (msg.textArea.isEmpty()) {
        errosValidacao.textArea = 'Insira um texto'
    }
    if (Object.keys(errosValidacao).length > 0) {
        imprimirErroValidacaoNoFormulario(errosValidacao)
        return false
    }
    limparFormErros()
    return true
}

function imprimirErroValidacaoNoFormulario(errosValidacao) {
    limparFormErros()
    if (errosValidacao.name) {
        $('#inputFormName').after('<p class="form-error"> *Esse campo não pode ser vazio</p>')
    }
    if (errosValidacao.email) {
        $('#inputFormEmail').after('<p class="form-error"> *Esse campo não pode ser vazio</p>')
    }
    if (errosValidacao.textArea) {
        $('#inputFormTextArea').after('<p class="form-error"> *Esse campo não pode ser vazio</p>')
    }
}

function limparFormErros() {
    $('#inputFormName').removeClass('form-error')
    $('#inputFormEmail').removeClass('form-error')
    $('#inputFormTextArea').removeClass('form-error')
    $('#inputFormName').next().remove()
    $('#inputFormEmail').next().remove()
    $('#inputFormTextArea').next().remove()
}

function limparForm() {
    $('#inputFormName').val('')
    $('#inputFormEmail').val('')
    $('#inputFormTextArea').val('')
}

function gravarBanco(msg) {
    let arrayMsgs = getMsgs()
    arrayMsgs.push(msg)
    localStorage.setItem("msgs", JSON.stringify(arrayMsgs))
}

function enviarEmail() {
    let msg = setMsg()
    if (validarForm(msg)) {
        gravarBanco(msg)
        $("#modal-contato").modal('hide')
        limparForm()
    }
}