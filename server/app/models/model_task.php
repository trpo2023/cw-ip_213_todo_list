<?php
include 'app/models/model_database.php';

class Model_Task extends Model
{
    public function __construct(Type $var = null) {
        $this->db = new Database();
    }

    function initial_tasks(){ 
        $user_id = $_POST["id"];
        $this->db->query("SELECT * FROM `user_task` JOIN tasks ON user_task.id_task = tasks.id WHERE user_task.id_user = :id;");
        $this->db->bind(':id',  $user_id);
        $result = $this->db->resultset();
        echo json_encode($result);
        die();
    }

    function add_task(){
        $user_id = $_POST["user_id"];
        $text = $_POST["text"];
        $today = date('Y-m-d H:i:s');
        $this->db->query("INSERT INTO tasks (text, date) VALUES (:text, :date)"); //date??
        $this->db->bind(':text',  $text);
        $this->db->bind(':date',  $today);
        $result = $this->db->execute();
        $this->db->query("SELECT id FROM tasks ORDER BY id DESC"); //date??
        $id = $this->db->single();
        $this->db->query("INSERT INTO user_task(id_user, id_task) VALUES (:user_id, :id)"); 
        $this->db->bind(':user_id',  $user_id); //user_id
        $this->db->bind(':id',  $id); //task_id
        $result = $this->db->execute();
        
    }

    function action_delete(){
        $this->db->query("DELETE * FROM `user_task` WHERE id_task = :id;");
        $this->db->bind(':id',  $id);
        $result = $this->db->execute();
        $this->db->query("DELETE * FROM `tasks` WHERE id = :id;");
        $this->db->bind(':id',  $id);
        $result = $this->db->execute();
    }

    function action_update(){
        $this->db->query("UPDATE tasks SET done = 1 WHERE id = :id;");
        $this->db->bind(':id',  $id); //task_id
        $result = $this->db->execute();
    }

}