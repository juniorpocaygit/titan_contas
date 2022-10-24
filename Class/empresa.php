<?php
    include_once('connect.php');

    Class Empresa{
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
                case(isset($_POST["type"]) && $_POST["type"] === "addEmpresa" && isset($_POST["nome"]));
                echo $this->addEmpresa($_POST["nome"]);
                break;
                
                case(isset($_POST["type"]) && $_POST["type"] === "updateEmpresa" && isset($_POST["id"]));
                echo $this->updateEmpresa($_POST["id"], $_POST['nome']);
                break;
           
                case(isset($_POST["type"]) && $_POST["type"] === "deleteEmpresa" && isset($_POST["id"]));
                echo $this->deleteEmpresa($_POST["id"]);
                break;

                case(isset($_POST["type"]) && $_POST["type"] === "listEmpresa");
                echo $this->listEmpresa();
                break;

                case(isset($_POST["type"]) && $_POST["type"] === "listByIdEmpresa" && isset($_POST["id"]));
                echo $this->listByIdEmpresa($_POST["id"]);
                break;
            }
        }
        public function addEmpresa($nome)
        {
            $conexao = $this->con;
            $output = array('error' => false);

            $stmt = $conexao->prepare("SELECT id_empresa FROM empresa WHERE nome = :nome");
            $stmt->bindParam(':nome', $nome);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                $output['error'] = true;
                $output['message'] = 'Empresa já existente.';
                return;
            }
            $empresaInsert = 'INSERT INTO empresa (nome) VALUES (:nome)';
            $stmt = $conexao->prepare($empresaInsert);
            $stmt->bindParam(':nome', $nome);
            if ($stmt->execute()){
                    $output['message'] = 'Empresa inserida com sucesso!';
                } else {
                    //Erro caso tenha algum problema em inserir o usuário no banco
                    $output['error'] = true;
                    $output['message'] = 'Houve um erro ao inserir a empresa';
                } 
            echo json_encode($output);        
        }

        public function listEmpresa()
        {
            $conexao = $this->con;
            $output = array('error' => false);

            try{
                $stmt = $conexao->prepare("SELECT * FROM empresa");
                $stmt->execute();
                $output = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
            }
            catch(PDOException $e){
                $output['error'] = true;
                $output['message'] = $e->getMessage();
            }
            echo json_encode($output);
        }
        
        public function listByIdEmpresa($id)
        {
            $conexao = $this->con;
            $output = array('error' => false);

             try{
                $stmt = $conexao->prepare("SELECT * FROM empresa WHERE id_empresa = :id_empresa");
                $stmt->bindParam(':id_empresa', $id);
                $stmt->execute();
                $output['data'] = $stmt->fetch();
            }
            catch(PDOException $e){
                $output['error'] = true;
                $output['message'] = $e->getMessage();
            }
            echo json_encode($output);
        }

        public function updateEmpresa($id, $nome)
        {
            $conexao = $this->con;
            $output = array('error' => false);

            try {             
                $stmt = $conexao->prepare("UPDATE empresa SET nome = :nome WHERE id_empresa = :id_empresa");
                $stmt->bindParam(':id_empresa', $id);
                $stmt->bindParam(':nome', $nome);
                if ($stmt->execute()) {                   
                    $output['message'] = 'Atualização realizada com sucesso!';
                }    
            } catch (PDOException $e) {
               //Erro caso tenha algum problema em atualizar a cor no banco
                $output['error'] = true;
                $output['message'] = 'Houve um erro com a atualização desta empresa';
            }
            echo json_encode($output);              
        }

         public function deleteEmpresa($id){
            $conexao = $this->con;
            $output = array('error' => false);

            $stmt = $conexao->prepare("DELETE FROM empresa WHERE id_empresa = :id_empresa LIMIT 1");
            $stmt->bindParam(':id_empresa', $id);
            if ($stmt->execute()) {
                $output['error'] = false;
                $output['message'] = "Exclusão efetuada com sucesso!";
            } else {
                $output['error'] = true;
                $output['message'] = "Não conseguimos deletar essa empresa.";               
            }
            echo json_encode($output);
        }

    };

    $conexao = new connDB();
    $classe = new Empresa($conexao->open());
    $classe->send();


 

?>