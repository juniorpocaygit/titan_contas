$(document).ready(function () {
  listEmpresas()
  listConta()
  // getCorSelect()
  // getProdutos()
    
});
// Filtros // --------------------------------------------------------------------------------

//Limpar Filtros
$("#btn_limpar_filtro").on("click", function (e) {
  e.preventDefault();
  listConta(); 
  resetForm()
})

//Filtrar pelo nome da empresa
$("#filtro_empresas").on("change", function (e) {
  e.preventDefault();

  let filtroNome = $("#filtro_empresas option:selected").val();
 
  if (filtroNome.trim() == ""){
    $("div#mensagem").show().html("Preencha o campo de filtro por nome").resetMessage();
    return;
  }
  $.ajax({
    url: "Class/filtros.php",
    type: "POST",
    data: {
      type:"filtroNomeEmpresa",
      filtro: filtroNome,
    },
    success: function (response) {
      response = JSON.parse(response);
      if (response.error) {
        $("div#mensagem").show().addClass("red").html(response.message).resetMessage();
      } else {
        let htmlContas = response.map(resp => 
          `<tr>
            <td>${resp.nome}</td>
            <td>${resp.data_pagar.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1')}</td>
            <td>R$ ${mascaraValor(resp.valor)}</td>
            <td>${viewPago(resp.data_pagar, resp.valor, resp.pago)}</td>
            <td>
                <button class="btn pagar btn-sm" data-id="${resp.id_conta_pagar}">
                pagar</button>
                <button class="btn edit btn-sm" data-table="conta" data-id="${resp.id_conta_pagar}">
                <i class="fa-solid fa-pen"></i></button>
                <button class="btn delete btn-sm" data-table="conta" data-id="${resp.id_conta_pagar}">
                <i class="fa-solid fa-trash-can"></i></button>
            </td>
          </tr>`
        )
        $('#tbodycontas').empty().append(htmlContas)

        resetForm()
      }
    },
    error: function () {
      $("div#mensagem").show().addClass("red").html("Ocorreu um erro durante a solicitação.").resetMessage();
    },
  });
})

//Filtrar pela data
$(document).on('click','#form_filtro_data .btn_buscar', function(e){
  e.preventDefault();

  let filtroData = $('#filtro_data').val();
  
  $.ajax({
    url: "Class/filtros.php",
    type: "POST",
    data: {
      type:"filtroData",
      filtro: filtroData,
    },
    success: function (response) {
      response = JSON.parse(response);
      if (response.error) {
        $("div#mensagem").show().addClass("red").html(response.message).resetMessage();
      } else {
         let htmlContas = response.map(resp => 
          `<tr>
            <td>${resp.nome}</td>
            <td>${resp.data_pagar.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1')}</td>
            <td>R$ ${mascaraValor(resp.valor)}</td>
            <td>${viewPago(resp.data_pagar, resp.valor, resp.pago)}</td>
            <td>
                <button class="btn pagar btn-sm" data-id="${resp.id_conta_pagar}">
                pagar</button>
                <button class="btn edit btn-sm" data-table="conta" data-id="${resp.id_conta_pagar}">
                <i class="fa-solid fa-pen"></i></button>
                <button class="btn delete btn-sm" data-table="conta" data-id="${resp.id_conta_pagar}">
                <i class="fa-solid fa-trash-can"></i></button>
            </td>
          </tr>`
        )
        $('#tbodycontas').empty().append(htmlContas)
        resetForm()
      }
    },
    error: function () {
      $("div#mensagem").show().addClass("red").html("Ocorreu um erro durante a solicitação.").resetMessage();
    },
  });
})

//Filtrar pela valor da conta
$(document).on('click','#filtro_preco .btn_buscar', function(e){
  e.preventDefault();

  let filtroValor = $('#filtro_valor').val().replace("R$","").replace(".","").replace(",",".");
  let filtroComparativo = $("#filtro_select_comparativo :selected").text()

  $.ajax({
    url: "Class/filtros.php",
    type: "POST",
    data: {
      type:"filtroValor",
      filtro: filtroValor,
      comparativo: filtroComparativo
    },
    success: function (response) {
   response = JSON.parse(response);
      if (response.error) {
        $("div#mensagem").show().addClass("red").html(response.message).resetMessage();
      } else {
        let htmlContas = response.map(resp => 
          `<tr>
            <td>${resp.nome}</td>
            <td>${resp.data_pagar.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1')}</td>
            <td>R$ ${mascaraValor(resp.valor)}</td>
            <td>${viewPago(resp.data_pagar, resp.valor, resp.pago)}</td>
            <td>
                <button class="btn pagar btn-sm" data-id="${resp.id_conta_pagar}">
                pagar</button>
                <button class="btn edit btn-sm" data-table="conta" data-id="${resp.id_conta_pagar}">
                <i class="fa-solid fa-pen"></i></button>
                <button class="btn delete btn-sm" data-table="conta" data-id="${resp.id_conta_pagar}">
                <i class="fa-solid fa-trash-can"></i></button>
            </td>
          </tr>`
        )
        $('#tbodycontas').empty().append(htmlContas)
        resetForm()
      }
    },
    error: function () {
      $("div#mensagem").show().addClass("red").html("Ocorreu um erro durante a solicitação.").resetMessage();
    },
  });
})

// Contas a pagar // --------------------------------------------------------------------------------

//Inserir Conta
$("#conta #btn_add").on("click", function (e) {
  e.preventDefault();

  $("#conta #btn_add").hide();
  $(".c-loader").show();

  let empresa = $("#conta #todas_empresas").val();
  let conta_valor = $("#conta #valor").val().replace("R$ ","").replace(".","").replace(",",".");
  let valor = conta_valor
  let data_pagar = $("#conta #data_pagar").val();
 
  if (empresa.trim() == ""){
    $("div#mensagem").show().html("Selecione uma empresa").resetMessage();
    $("#conta #btn_add").show();
    $(".c-loader").hide();
    return;
  }
  if (valor.trim() == ""){
    $("div#mensagem").show().html("Preencha o campo valor").resetMessage();
    $("#conta #btn_add").show();
    $(".c-loader").hide();
    return;
  }
  if (data_pagar.trim() == ""){
    $("div#mensagem").show().html("Insira uma data de pagamento.").resetMessage();
    $("#conta #btn_add").show();
    $(".c-loader").hide();
    return;
  }
  $.ajax({
    url: "Class/contas.php",
    type: "POST",
    data: {
      type:"addConta",
      empresa: empresa,
      valor: valor,
      data_pagar: data_pagar,
    },
    success: function (response) {
      response = JSON.parse(response);
      $("#conta #btn_add").show();
      $(".c-loader").hide();
      if (response.error) {
        $("div#mensagem").show().addClass("red").html(response.message).resetMessage();
      } else {
        $("div#mensagem").show().addClass("green").html(response.message).resetMessage();
        resetForm();
        listConta()
      }
    },
    error: function () {
      $("#conta #btn_add").show();
      $(".c-loader").hide();
      $("div#mensagem").show().addClass("red").html("Ocorreu um erro durante a solicitação.").resetMessage();
    },
  });
})

//Carregar conta para ser atualizada
$(document).on("click","#tbodycontas .edit", function (e) {
  e.preventDefault();

  let id = $(this).data("id");
  listByIdConta(id);
  $("#conta #btn_add").hide();
  $("#conta #btn_update").show();
  $("#conta #btn_update_cancel").show();
});

//Atualizar conta
$("#conta #btn_update").on("click", function (e) {
  e.preventDefault();

  $("#conta #btn_update").hide();
  $("#conta #btn_update_cancel").hide();
  $(".c-loader").show();

  let id = $("#conta #id_conta").val();
  let empresa = $("#conta #todas_empresas option:selected").val();
  let valor = $("#conta #valor").val().replace("R$","").replace(".","").replace(",",".");
  let data_pagar = $("#conta #data_pagar").val();

  if (empresa.trim() == ""){
    $("div#mensagem").show().html("Selecione uma empresa").resetMessage();
    $("#conta #btn_update").show();
    $("#conta #btn_update_cancel").show();
    $(".c-loader").hide();
    return;
  }
  if (valor.trim() == ""){
    $("div#mensagem").show().html("Preencha o campo valor").resetMessage();
    $("#conta #btn_update").show();
    $("#conta #btn_update_cancel").show();
    $(".c-loader").hide();
    return;
  }
  if (data_pagar.trim() == ""){
    $("div#mensagem").show().html("Preencha o campo data").resetMessage();
    $("#conta #btn_update").show();
    $("#conta #btn_update_cancel").show();
    $(".c-loader").hide();
    return;
  }
  $.ajax({
    url: "Class/contas.php",
    type: "POST",
    data: {
      type:"updateConta",
      id: id,
      empresa: empresa,
      valor: valor,
      data: data_pagar,
    },
    success: function (response) {
      response = JSON.parse(response);
      $("#conta #btn_update").show();
      $("#conta #btn_update_cancel").show();
      $(".c-loader").hide();
      if (response.error) {
        $("div#mensagem").show().addClass("red").html(response.message).resetMessage();
      } else {
        $("div#mensagem").show().addClass("green").html(response.message).resetMessage();
        listConta();
        alternaBotoes();
      }
    },
    error: function () {
      $("#conta #btn_update").show();
      $("#conta #btn_update_cancel").show();
      $(".c-loader").hide();
      $("div#mensagem").show().addClass("red").html("Ocorreu um erro durante a solicitação.").resetMessage();
    },
  });
})

//Carrega conta para ser deletada
$(document).on("click","#tbodycontas .delete", function (e) {
  e.preventDefault();
  let id = $(this).data("id");
  listByIdConta(id);
  $('#table_delete').html($(this).data("table"));
  $("#msgdelete").show();
});

//Delete conta
$(".iddelete").click(function () {
  let id = $(this).val();
  if ($('#table_delete').text() == "conta") {
    $.ajax({
      url: "Class/contas.php",
      type: "POST",
      data: {
        type: "deleteConta",
        id: id,
      },
      success: function (response) {
        response = JSON.parse(response);
        if (response.error) {
          $("div#mensagem").show().html(response.message).resetMessage();
          closemsgdelete() 
        } else {
          $("div#mensagem").show().addClass("green").html(response.message).resetMessage();
          closemsgdelete();
          listConta();
        }
      },
      error: function () {
        $("div#mensagem").show().html("Ocorreu um erro durante a solicitação.").resetMessage();
        closemsgdelete() 
      },
    });
  }
 
});

//Lista todas as contas
function listConta(){
  $.ajax({
      url: "Class/contas.php",
      type: "POST",
      data: {
        type: "listConta",
      },
      success: function (response) {
        response = JSON.parse(response);
        if (response.error) {
          $("div#mensagem").show().html(response.message).resetMessage();
        } else {
        let htmlContas = response.map(resp => 
          `<tr>
            <td>${resp.nome}</td>
            <td>${resp.data_pagar.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1')}</td>
            <td>R$ ${mascaraValor(resp.valor)}</td>
            <td>${viewPago(resp.data_pagar, resp.valor, resp.pago)}</td>
            <td>
                <button class="btn pagar btn-sm" data-id="${resp.id_conta_pagar}">
                pagar</button>
                <button class="btn edit btn-sm" data-table="conta" data-id="${resp.id_conta_pagar}">
                <i class="fa-solid fa-pen"></i></button>
                <button class="btn delete btn-sm" data-table="conta" data-id="${resp.id_conta_pagar}">
                <i class="fa-solid fa-trash-can"></i></button>
            </td>
          </tr>`
        )
        $('#tbodycontas').empty().append(htmlContas)
        }
      },
      error: function () {
        $("div#mensagem").show().html("Ocorreu um erro durante a solicitação.").resetMessage();
      },
  });
}

//Carregar conta para ser paga
$(document).on("click","#tbodycontas .pagar", function (e) {
  e.preventDefault();

  let id = $(this).data("id");
  listByIdPagamento(id);
  $("#modalpagar").show();
});

//Atualizar pagamento 
$("#modalpagar .idpagamento").on("click", function (e) {
  e.preventDefault();

  let id = $("#modalpagar .idpagamento").val();
  let data_pagar = $("#modalpagar #data_pagamento").val();

  if (data_pagar.trim() == ""){
    $("div#mensagem").show().html("Preencha o campo data").resetMessage();
    return;
  }
  $.ajax({
    url: "Class/contas.php",
    type: "POST",
    data: {
      type:"updatePagamento",
      id: id,
      data: data_pagar,
    },
    success: function (response) {
      response = JSON.parse(response);
      $("#conta #btn_update").show();
      $("#conta #btn_update_cancel").show();
      $(".c-loader").hide();
      if (response.error) {
        $("div#mensagem").show().addClass("red").html(response.message).resetMessage();
      } else {
        $("div#mensagem").show().addClass("green").html(response.message).resetMessage();
        closemodalpagamento()
        listConta()
      }
    },
    error: function () {
      $("div#mensagem").show().addClass("red").html("Ocorreu um erro durante a solicitação.").resetMessage();
    },
  });
})

function viewPago(data, valor, pago){
  if(pago == null){
    return "A PAGAR"
  }
  let data_pagar = parseInt(data.replace(/(\d*)-(\d*)-(\d*).*/, '$3$2$1'))
  let pagamento = parseInt(pago.replace(/(\d*)-(\d*)-(\d*).*/, '$3$2$1'))

  if (pagamento > data_pagar) {
    return "R$ "+mascaraValor(valor*1.1 * 100)
  } else if (pagamento == data_pagar) {
    return "R$ "+mascaraValor(valor)
  } else if (pagamento < data_pagar) {
    return "R$ "+mascaraValor(valor*0.95)
  }
}

function listByIdConta(id){
  $.ajax({
      url: "Class/contas.php",
      type: "POST",
      data: {
        type: "listByIdConta",
        id: id,
      },
      success: function (response) {
        response = JSON.parse(response);
        if (response.error) {
          $("div#mensagem").show().html(response.message).resetMessage();
        } else { 
          $('#conta h3').empty().text('Alterar conta')     
          $("#id_conta").val(response.data.id_conta_pagar);
          $("#valor").val("R$ "+mascaraValor(response.data.valor));
          $("#data_pagar").val(response.data.data_pagar.replace(/(\d*)-(\d*)-(\d*).*/, '$1-$2-$3'));
          $("#todas_empresas").val( $('option:contains("'+response.data.nome+'")').val() );
          
          $(".iddelete").val(response.data.id_conta_pagar);
          $("#nome_delete").html(response.data.nome+"<br>R$ "+mascaraValor(response.data.valor));
        }
      },
      error: function () {
        $("div#mensagem").show().html("Ocorreu um erro durante a solicitação.").resetMessage();
      },
  });
}

function listByIdPagamento(id){
  $.ajax({
      url: "Class/contas.php",
      type: "POST",
      data: {
        type: "listByIdConta",
        id: id,
      },
      success: function (response) {
        response = JSON.parse(response);
        if (response.error) {
          $("div#mensagem").show().html(response.message).resetMessage();
        } else {              
          $(".idpagamento").val(response.data.id_conta_pagar);
          $("#nome_pagamento").html(response.data.nome+"<br>R$ "+mascaraValor(response.data.valor));
        }
      },
      error: function () {
        $("div#mensagem").show().html("Ocorreu um erro durante a solicitação.").resetMessage();
      },
  });
}



// Empresa // --------------------------------------------------------------------------------

//Inserir Empresa
$("#form_empresa #btn_add").on("click", function (e) {
  e.preventDefault();

  $(this).hide();
  $(".c-loader").show();

  let nome = $("#form_empresa #nome").val();

  if (nome.trim() == ""){
    $("div#mensagem").show().html("Preencha o campo nome da empresa").resetMessage();
    $("#form_empresa #btn_add").show();
    $(".c-loader").hide();
    return;
  }
  $.ajax({
    url: "Class/empresa.php",
    type: "POST",
    data: {
      type:"addEmpresa",
      nome: nome,
    },
    success: function (response) {
      response = JSON.parse(response);
      $("#form_empresa #btn_add").show();
      $(".c-loader").hide();
      if (response.error) {
        $("div#mensagem").show().addClass("red").html(response.message).resetMessage();
      } else {
        $("div#mensagem").show().addClass("green").html(response.message).resetMessage();
        listEmpresas();
        resetForm();
      }
    },
    error: function () {
      $("#form_empresa #btn_add").show();
      $(".c-loader").hide();
      $("div#mensagem").show().addClass("red").html("Ocorreu um erro durante a solicitação.").resetMessage();
    },
  });
})

//Carrega empresa para ser atualizada
$(document).on("click","#tbodyempresas .edit", function (e) {
  e.preventDefault();

  let id = $(this).data("id");
  listByIdEmpresa(id);
  $("#form_empresa #btn_add").hide();
  $("#form_empresa #btn_update").show();
  $("#form_empresa #btn_update_cancel").show();
});

//Atualizar Empresa
$("#form_empresa #btn_update").on("click", function (e) {
  e.preventDefault();

  $("#btn_update").hide();
  $("#btn_update_cancel").hide();
  $(".c-loader").show();

  let id = $("#form_empresa #id_empresa").val();
  let nome = $("#form_empresa #nome").val();

  if (nome.trim() == ""){
    $("div#mensagem").show().html("Preencha o campo nome da empresa").resetMessage();
    $("#btn_update").show();
    $("#btn_update_cancel").show();
    $(".c-loader").hide();
    return;
  }
  $.ajax({
    url: "Class/empresa.php",
    type: "POST",
    data: {
      type:"updateEmpresa",
      id: id,
      nome: nome,
    },
    success: function (response) {
      response = JSON.parse(response);
      $("#btn_update").show();
      $("#btn_update_cancel").show();
      $(".c-loader").hide();
      if (response.error) {
        $("div#mensagem").show().addClass("red").html(response.message).resetMessage();
      } else {
        $("div#mensagem").show().addClass("green").html(response.message).resetMessage();
        alternaBotoes();
        listEmpresas();
      
      }
    },
    error: function () {
      $("btn_atualizar_cor").show();
      $("btn_atualizar_cancel").show();
      $(".c-loader").hide();
      $("div#mensagem").show().addClass("red").html("Ocorreu um erro durante a solicitação.").resetMessage();
    },
  });
})

//Carrega empresa para ser deletada
$(document).on("click","#tbodyempresas .delete", function (e) {
  e.preventDefault();

  $('#table_delete').html($(this).data("table"));
  let id = $(this).data("id");
  listByIdEmpresa(id);
  $("#msgdelete").show();
});

//Delete Empresa
$(".iddelete").click(function () {
  let id = $(this).val();
  if ($('#table_delete').text() == "empresa") {
    $.ajax({
      url: "Class/empresa.php",
      type: "POST",
      data: {
        type: "deleteEmpresa",
        id: id,
      },
      success: function (response) {
        response = JSON.parse(response);
        if (response.error) {
          $("div#mensagem").show().html(response.message).resetMessage();
          closemsgdelete() 
        } else {
          $("div#mensagem").show().addClass("green").html(response.message).resetMessage();
          listEmpresas();
          closemsgdelete();
          resetForm()
        }
      },
      error: function () {
        $("div#mensagem").show().html("Ocorreu um erro durante a solicitação.").resetMessage();
        closemsgdelete() 
      },
    });
  }
});

//Lista todas as empresas
function listEmpresas(){
  $.ajax({
      url: "Class/empresa.php",
      type: "POST",
      data: {
        type: "listEmpresa",
      },
      success: function (response) {
        response = JSON.parse(response);
        if (response.error) {
          $("div#mensagem").show().html(response.message).resetMessage();
        } else {
          let htmlEmpresas = response.map(resp => 
          `<tr>
            <td>${resp.nome}</td>
            <td>
                <button class="btn edit btn-sm" data-table="empresa" data-id="${resp.id_empresa}">
                <i class="fa-solid fa-pen"></i></button>
                <button class="btn delete btn-sm" data-table="empresa" data-id="${resp.id_empresa}">
                <i class="fa-solid fa-trash-can"></i></button>
            </td>
          </tr>`
        )
        $('#tbodyempresas').empty().append(htmlEmpresas)

        let selectEmpresas = 
        `<option selected="selected">Empresa</option>`+
        response.map(resp =>`<option value="${resp.id_empresa}">${resp.nome}</option>`)
        $('#todas_empresas').empty().append(selectEmpresas);
        $('#filtro_empresas').empty().append(selectEmpresas);
        }
      },
      error: function () {
        $("div#mensagem").show().html("Ocorreu um erro durante a solicitação.").resetMessage();
      },
  });
}

//Lista empresa pelo id
function listByIdEmpresa(id){
  $.ajax({
      url: "Class/empresa.php",
      type: "POST",
      data: {
        type: "listByIdEmpresa",
        id: id,
      },
      success: function (response) {
        response = JSON.parse(response);
        if (response.error) {
          $("div#mensagem").show().html(response.message).resetMessage();
        } else {
          $('#form_empresa h3').empty().text('Alterar Empresa') 
          $("#nome").val(response.data.nome);
          $("#id_empresa").val(response.data.id_empresa);
          $(".iddelete").val(response.data.id_empresa);
          $("#nome_delete").html(response.data.nome);
        }
      },
      error: function () {
        $("div#mensagem").show().html("Ocorreu um erro durante a solicitação.").resetMessage();
      },
  });
}


//Funções genéricas // ---------------------------------------------------------------------------

//Máscara valor conta
$('input#valor').on('keyup', function() {
  var atual = mascaraValor($(this).val());
  $(this).val("R$ "+atual);
});

//Máscara valor filtro
$('input#filtro_valor').on('keyup', function() {
  var atual = mascaraValor($(this).val());
  $(this).val("R$ "+atual);
});

$(document).on("click", ".cancel-delete", function (e) {
  e.preventDefault();
  closemsgdelete()  
}); 

$(document).on("click", ".cancel-pagamento", function (e) {
  e.preventDefault();
  closemodalpagamento()
}); 

$(document).on("click", "#btn_update_cancel", function (e) {
  e.preventDefault();
  alternaBotoes() 
  resetForm();
});  

function closemsgdelete(){
  $("#msgdelete").hide();
  resetForm()
};

function closemodalpagamento(){
  $("#modalpagar").hide();
  resetForm()
};

function alternaBotoes(){
  $("#empresa #btn_update").hide();
  $("#empresa #btn_update_cancel").hide();
  $("#empresa #btn_add").show();
  $("#conta #btn_update").hide();
  $("#conta #btn_update_cancel").hide();
  $("#conta #btn_add").show();
  $('#form_empresa h3').empty().text('Inserir Empresa') 
  $('#conta h3').empty().text('Inserir uma conta') 
  resetForm()
};


