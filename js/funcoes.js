/* Reset Message*/
$.fn.extend({
    resetMessage: function() {
    return setTimeout(() => {
        $("div#mensagem").css("display", "none").removeClass("green", "red");
        $("div#msgcep").css("display", "none");
        $("div#msgendereco").css("display", "none");
    },4000);
    } 
});

/*Reset Formulário */
function resetForm(){
	$('form')[0].reset();
	$('form')[1].reset();
	$('form')[2].reset();
	$('form')[3].reset();
	$('form')[4].reset();
	$('form')[5].reset();

};

//Máscara Valor
function mascaraValor(valor) {
    valor = valor.toString().replace(/\D/g,"");
    valor = valor.toString().replace(/(\d)(\d{8})$/,"$1.$2");
    valor = valor.toString().replace(/(\d)(\d{5})$/,"$1.$2");
    valor = valor.toString().replace(/(\d)(\d{2})$/,"$1,$2");
    return valor                    
}





