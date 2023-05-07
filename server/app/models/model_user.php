<?php
include 'app/models/model_database.php';

class Model_User extends Model
{
    private $status;
    public function __construct(Type $var = null) {
        $this->db = new Database();
    }

    private function showResult()
    {
        echo json_encode(
            [
                "status" => $this->status,
            ]
        );
        die();
    }

    function validateLogin($login)
    {
        $login = htmlspecialchars($login); 
        $this->db->query("SELECT * FROM users WHERE login = :login");
        $this->db->bind(':login', $login);
        $row = $this->db->single();
        if($row){
            $this->status = "error, user already exists";
            $this->showResult();
        }
        else
        {
            return $login;    
        }
    }

    function register()
    {
        $login = $_POST["login"];
        $password = md5($_POST["password"]);
        $valLogin = $this->validateLogin($login);
        $this->db->query("INSERT INTO users (login, password) VALUES (:login, :password)");
        $this->db->bind(':login', $valLogin);
        $this->db->bind(':password', $password);
        $result = $this->db->execute();
        $result == 1 ? $this->status = "success" : $this->status = "error";
        $this->showResult();
    }
}