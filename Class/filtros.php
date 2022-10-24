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
                case(isset($_POST["type"]) && $_POST["type"] === "filtroNomeEmpresa" && isset($_POST["filtro"]));
                echo $this->filtroNomeEmpresa($_POST["filtro"]);
                break;
             
                case(isset($_POST["type"]) && $_POST["type"] === "filtroData" && isset($_POST["filtro"]));
                echo $this->filtroData($_POST["filtro"]);
                break;                
             
                case(isset($_POST["type"]) && $_POST["type"] === "filtroValor" && isset($_POST["filtro"]));
                echo $this->filtroValor($_POST["filtro"]);
                break;
            }
        }

        public function filtroNomeEmpresa($filtro)
        {
            $conexao = $this->con;
            $output = array('error' => false);

            try{
                $stmt = $conexao->prepare("SELECT * FROM conta_pagar c JOIN empresa e ON c.id_empresa = e.id_empresa WHERE c.id_empresa = :id_empresa");
                $stmt->bindParam(':id_empresa', $filtro);
                $stmt->execute();
                $output = $stmt->fetchAll();
            }
            catch(PDOException $e){
                $output['error'] = true;
                $output['message'] = $e->getMessage();
            }
            echo json_encode($output);
        }
        
        public function filtroData($filtro)
        {
            $conexao = $this->con;
            $output = array('error' => false);

             try{
                $stmt = $conexao->prepare("SELECT * FROM conta_pagar c JOIN empresa e ON c.id_empresa = e.id_empresa WHERE c.data_pagar = :data_pagar");
                $stmt->bindParam(':data_pagar', $filtro);
                $stmt->execute();
                $output = $stmt->fetchAll();
            }
            catch(PDOException $e){
                $output['error'] = true;
                $output['message'] = $e->getMessage();
            }
            echo json_encode($output);
        }

        public function filtroValor($filtro)
        {
            $conexao = $this->con;
            $output = array('error' => false);

            $comparativo = $_POST['comparativo'];
                
            try{
                if ($comparativo == 'Igual') {
                    $stmt = $conexao->prepare("SELECT * FROM conta_pagar c JOIN empresa e ON c.id_empresa = e.id_empresa WHERE c.valor = :valor");
                    $stmt->bindParam(':valor', $filtro);
                    $stmt->execute();
                    $output = $stmt->fetchAll();
                } elseif ($comparativo == 'Maior') {
                    $stmt = $conexao->prepare("SELECT * FROM conta_pagar c JOIN empresa e ON c.id_empresa = e.id_empresa WHERE c.valor > :valor");
                    $stmt->bindParam(':valor', $filtro);
                    $stmt->execute();
                    $output = $stmt->fetchAll();
                }  elseif ($comparativo == 'Menor') {
                    $stmt = $conexao->prepare("SELECT * FROM conta_pagar c JOIN empresa e ON c.id_empresa = e.id_empresa WHERE c.valor < :valor");
                    $stmt->bindParam(':valor', $filtro);
                    $stmt->execute();
                    $output = $stmt->fetchAll();
                }  
            }
            catch(PDOException $e){
                $output['error'] = true;
                $output['message'] = $e->getMessage();
            }
            echo json_encode($output);
        }

    };
    $conexao = new connDB();
    $classe = new Contas($conexao->open());
    $classe->send();
?>