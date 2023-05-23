<?php
include 'app/models/model_database.php';

class Model_User extends Model
{
    private $status;
    private $error;
    private $id;
    public function __construct($include = true) {
        if ($include)
            $this->db = new Database();
    }

    private function showResult()
    {
        echo json_encode(
            [
                "status" => $this->status,
                "error" => $this->error ?: 'no',
                "id" => $this->id,
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
            $this->status = "error";
            $this->error = "user already exists";
            $this->showResult();
        }
        else
        {
            return $login;    
        }
    }

    function preparePswd($pas){
        $preparepswd = md5(htmlspecialchars($pas));
        return $preparepswd;
    }

    function register()
    {
        $login = $_POST["login"];
        $pas = $_POST["password"];
        $password = $this->preparePswd($pas);
        $valLogin = $this->validateLogin($login);

        $this->db->query("INSERT INTO users (login, password) VALUES (:login, :password)");
        $this->db->bind(':login', $valLogin);
        $this->db->bind(':password', $password);
        $result = $this->db->execute();
        if ($result == 1) {
            $this->status = "success";
            $this->db->query("SELECT id from users WHERE login = :login");
            $this->db->bind(':login', $valLogin);
            $row = $this->db->single(); 
            $this->id = $row["id"];
        } else {
            $this->status = "error";  
        }
        $this->showResult();
    }

    function login()
    {
        $login = htmlspecialchars($_POST["login"]);
        $pas = $_POST["password"];
        $password = preparePswd($pas);
        $this->db->query("SELECT id from users WHERE login = :login and password = :password");
        $this->db->bind(':login', $login);
        $this->db->bind(':password', $password);
        $row = $this->db->single();
        if($row){
            $this->id = $row["id"];
            $this->status = "success";
            $this->showResult(); 
        }
    }
}