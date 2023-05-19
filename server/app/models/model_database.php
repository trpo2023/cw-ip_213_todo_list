<?php

class Database
{
    public function __construct()
    {
        $this->db = new PDO('mysql:host=localhost;dbname=app;charset=utf8', 'root', '');
    }
    
    private function __clone()
    {
    }
    function __wakeup()
    {
        throw new Exception("Cannot unserialize singleton");
    }

    function query($sql)
    {
        $this->stmt = $this->db->prepare($sql);
    }
    function bind($param, $value)
    {
        $this->stmt->bindValue($param, $value);
    }
    function single()
    {
        $this->stmt->execute();
        return $this->stmt->fetch(PDO::FETCH_ASSOC);
    }
    function resultset()
    {
        $this->stmt->execute();
        return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    function execute()
    {
        return $this->stmt->execute();
    }
}