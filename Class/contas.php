<?php
    include_once('connect.php');

    Class Contas{
        private $con = null;
        public function __construct($conexao){
            $this->con = $conexao;
        }

        public function send(){
            if (empty($_POST) || $this->con == null) {
                $output['error'] = true;
                $output['message'] = "Sem post ou conexão";
                return;
            }
            switch(true){
                case(isset($_POST["type"]) && $_POST["type"] === "addConta");
                echo $this->addConta();
                break;
                
                case(isset($_POST["type"]) && $_POST["type"] === "updateConta" && isset($_POST["id"]));
                echo $this->updateConta($_POST["id"]);
                break;
                
                case(isset($_POST["type"]) && $_POST["type"] === "updatePagamento" && isset($_POST["id"]));
                echo $this->updatePagamento($_POST["id"]);
                break;
               
                case(isset($_POST["type"]) && $_POST["type"] === "deleteConta" && isset($_POST["id"]));
                echo $this->deleteConta($_POST["id"]);
                break;

                case(isset($_POST["type"]) && $_POST["type"] === "listConta");
                echo $this->listConta();
                break;

                case(isset($_POST["type"]) && $_POST["type"] === "listByIdConta" && isset($_POST["id"]));
                echo $this->listByIdConta($_POST["id"]);
                break;                
            }
        }

        public function addConta()
        {
            $conexao = $this->con;
            $output = array('error' => false);
            
            $contaInsert = 'INSERT INTO conta_pagar (valor, data_pagar, id_empresa) VALUES (:valor, :data_pagar, :id_empresa)';
            $stmt = $conexao->prepare($contaInsert);
            $stmt->bindParam(':valor', $_POST['valor']);
            $stmt->bindParam(':data_pagar', $_POST['data_pagar']);
            $stmt->bindParam(':id_empresa', $_POST['empresa']);
            if ($stmt->execute()){
                    $output['message'] = 'Conta inserida com sucesso!';
                } else {
                    //Erro caso tenha algum problema em inserir a conta no banco
                    $output['error'] = true;
                    $output['message'] = 'Houve um erro ao inserir a conta';
                } 
            echo json_encode($output);        
        }

        public function listConta()
        {
            $conexao = $this->con;
            $output = array('error' => false);

            try{
                $stmt = $conexao->prepare("SELECT * FROM conta_pagar c JOIN empresa e ON c.id_empresa = e.id_empresa");
                $stmt->execute();
                $output = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            catch(PDOException $e){
                $output['error'] = true;
                $output['message'] = $e->getMessage();
            }
            echo json_encode($output);          
        }
        
        public function listByIdConta($id)
        {
            $conexao = $this->con;
            $output = array('error' => false);

            try{
                $stmt = $conexao->prepare("SELECT * FROM conta_pagar c JOIN empresa e ON c.id_empresa = e.id_empresa WHERE id_conta_pagar = :id_conta_pagar");
                $stmt->bindParam(':id_conta_pagar', $id);
                $stmt->execute();
                $output['data'] = $stmt->fetch();
            }
            catch(PDOException $e){
                $output['error'] = true;
                $output['message'] = $e->getMessage();
            }
            echo json_encode($output);  
        }

        public function updateConta($id)
        {
            $conexao = $this->con;
            $output = array('error' => false);

            try {             
                $stmt = $conexao->prepare("UPDATE conta_pagar SET valor = :valor, data_pagar = :data_pagar, id_empresa = :id_empresa WHERE id_conta_pagar = :id_conta_pagar");
                $stmt->bindParam(':id_conta_pagar', $id);
                $stmt->bindParam(':id_empresa', $_POST['empresa']);
                $stmt->bindParam(':valor', $_POST['valor']);
                $stmt->bindParam(':data_pagar', $_POST['data']);
                if ($stmt->execute()) {                   
                    $output['message'] = 'Atualização realizada com sucesso!';
                }    
            } catch (PDOException $e) {
               //Erro caso tenha algum problema em atualizar a conta no banco
                $output['error'] = true;
                $output['message'] = 'Houve um erro com a atualização desta conta';
            }
            echo json_encode($output);              
        }

          public function updatePagamento($id)
        {
            $conexao = $this->con;
            $output = array('error' => false);

            try {             
                $stmt = $conexao->prepare("UPDATE conta_pagar SET pago = :pago WHERE id_conta_pagar = :id_conta_pagar");
                $stmt->bindParam(':id_conta_pagar', $id);
                $stmt->bindParam(':pago', $_POST['data']);
                if ($stmt->execute()) {                   
                    $output['message'] = 'Pagamento realizada com sucesso!';
                }    
            } catch (PDOException $e) {
               //Erro caso tenha algum problema em atualizar a conta no banco
                $output['error'] = true;
                $output['message'] = 'Houve um erro com a realização do pagamento';
            }
            echo json_encode($output);              
        }

        public function deleteConta($id)
        {
            $conexao = $this->con;
            $output = array('error' => false);

            $id = $_POST["id"];
            $stmt = $conexao->prepare("DELETE FROM conta_pagar WHERE id_conta_pagar = :id_conta_pagar LIMIT 1");
            $stmt->bindParam(':id_conta_pagar', $id);
            if ($stmt->execute()) {
                $output['error'] = false;
                $output['message'] = "Exclusão efetuada com sucesso!";
            } else {
                $output['error'] = true;
                $output['message'] = "Não conseguimos deletar essa conta.";               
            }
            echo json_encode($output);
        }

    };
    $conexao = new connDB();
    $classe = new Contas($conexao->open());
    $classe->send();
?>