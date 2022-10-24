<?php
Class connDB{
  
    private $server = "mysql:host=162.241.2.244; dbname=studio46_titancontas";
    private $username = "studio46_titan2";
    private $password = "3R5X[xw?sG*5";
    private $options  = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,);
    protected $conn;
     
    public function open(){
        try{
            $this->conn = new PDO($this->server, $this->username, $this->password, $this->options);
            return $this->conn;
        }
        catch (PDOException $e){
            echo "Houve um problema na conexão: " . $e->getMessage();
        }
    }
    public function close(){
        $this->conn = null;
    }
}
?>