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