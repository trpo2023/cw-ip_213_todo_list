<?php

class Model_User extends Model
{
    function getList()
    {
        echo $_GET["id"] . '<br>';
        // test return users
        echo json_encode([
            [
                "name" => "Andrey",
                "age" => 20,
            ],
            [
                "name" => "Max",
                "age" => 25,
            ]
            ]);
    }
}