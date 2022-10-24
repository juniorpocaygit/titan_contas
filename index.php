<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Teste Titan</title>
    <link href="css/estilo.css" rel="stylesheet" media="All">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Anek+Telugu:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
    <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="js/funcoes.js"></script>
  </head>
  <body>
    <div id="mensagem"></div>
    <div id="msgdelete">
        <p><small>Certeza que deseja excluir:</small></p>
        <h4 id="nome_delete" class="mb-4"></h4>
        <h4 id="table_delete" class="mb-4"></h4>
        <div class="buttons-delete">
            <button class="confirm-delete bred iddelete">Confirmar</button>
            <button class="cancel-delete">Cancelar</button>
        </div>
    </div>
    <div id="modalpagar">
        <p><small>Fazer o pagamento de:</small></p>
        <h4 id="nome_pagamento" class="mb-4"></h4>
        <center>
            <p><small>Insira a data do pagamento:</small></p>
            <form id="confirm_pagamento" class='w-75 mb-4'>
                <input type="date" name="data_pagamento" id="data_pagamento" placeholder="Data de Pagamento" >
            </form>
        </center>    
        <div class="buttons-delete">
            <button class="confirm-pagamento bgreen idpagamento">Confirmar</button>
            <button class="cancel-pagamento">Cancelar</button>
        </div>
    </div>
    <div class="container-fluid">
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <div id="conta" class="forms">
                        <h3>Inserir uma conta</h3>
                        <form id="form_contas">
                            <div class="row inputs">
                                <div class="col-md-4">
                                    <select id="todas_empresas">
                                        <option selected="selected">Empresa</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <input type="date" name="data_pagar" id="data_pagar" placeholder="data de pagamento">
                                </div>
                                <div class="col-md-4">
                                    <input type="text" name="valor" id="valor" placeholder="Valor">
                                    <input type="hidden" name="id_conta" id="id_conta">
                                </div>
                            </div>
                            <div class="buttons">
                                <button id="btn_add" class="bgreen">Inserir</button>
                                <button id="btn_update" class="bblue">Atualizar</button>
                                <button id="btn_update_cancel" class="bgray">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-md-4">
                    <div id="form_empresa"class="forms">
                        <h3>Inserir Empresa</h3>
                        <form id="empresa">
                            <div class="row inputs">
                                <div class="col-md-12">
                                    <input type="hidden" name="id_empresa" id="id_empresa">
                                    <input type="text" name="nome" id="nome" placeholder="Nome empresa">
                                </div>
                                <div class="col-md-12">
                                    <div class="buttons">
                                        <button id="btn_add" class="bgreen">Inserir</button>
                                        <button id="btn_update" class="bblue">Atualizar</button>
                                        <button id="btn_update_cancel" class="bgray">Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-8">
                    <div class="block">
                        <h3 class="mt-2 ml-3 bold">Contas</h3>
                        <div class="filtros_header mt-4">
                            <div class="barrafiltro"></div>
                            <div class="titulo_filtros">
                                <p><small>Filtros</small></p>
                            </div>
                        </div>
                         <div class="filtros">
                            <div class="row">
                                <div id="form_filtro_data" class="col-md-7 d-flex justify-content-between">
                                    <form class="w-100">
                                        <input type="date" name="filtro_data" id="filtro_data">
                                    </form>
                                    <button class="btn_buscar bblue">buscar</button>
                                </div>
                                <div class="col-md-5">
                                    <form id="filtro_empresa_nome">
                                        <select id="filtro_empresas"></select>
                                    </form>
                                </div>
                                <div class="col-md-7">
                                    <form id="filtro_preco">
                                        <div class="row justify-content-start">
                                            <div class="col-md-5">
                                                <input type="text" name="filtro_valor" id="filtro_valor" placeholder="Valor">
                                            </div>
                                            <div class="col-md-4">
                                                <select id="filtro_select_comparativo">
                                                    <option selected="selected" value="1">Maior</option>    
                                                    <option value="2">Menor</option>   
                                                    <option value="3">Igual</option>   
                                                </select>
                                            </div>
                                            <div class="col-md-3">
                                                <button class="btn_buscar bblue">buscar</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="col-md-5 limpar_filtro">
                                    <button id="btn_limpar_filtro" class="bblue">Limpar filtros</button>
                                </div>
                            </div>
                        </div>
                         <div class="barrafiltro mt-3 mb-3"></div>
                        <table class="table table-hover">
                            <thead align="center">
                                <tr>
                                    <td>Empresa</td>
                                    <td>Data de pagamento</td>
                                    <td>valor</td>
                                    <td>Pago</td>
                                    <td>Ações</td>
                                </tr>
                            </thead>
                            <tbody align="center" id="tbodycontas"></tbody>
                        </table>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="block">
                        <h3 class="mt-2 ml-3 bold">Empresas</h3>
                        <table class="table table-hover">
                            <thead align="center">
                                <tr>
                                    <td>Nome</td>
                                    <td>Ações</td>
                                </tr>
                            </thead>
                            <tbody align="center" id="tbodyempresas"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="js/home.js"></script>
  </body>
</html>