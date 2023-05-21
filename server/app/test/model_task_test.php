<?php
use PHPUnit\Framework\TestCase;
require_once "../core/model.php";
require_once "../core/controller.php";
require_once "../core/route.php";
require_once "../models/model_task.php";
final class Model_Task_Test extends TestCase
{       
    public function testPrepare()
    {   
        $login = 'Logooo';
        $text = 'INSERT INTO tasks (text) VALUES \'Съешь еще этих мягких булок..\'';
        $valLogin = htmlspecialchars($login);
        $valText = htmlspecialchars($text);
        $my = new Model_Task(0);
        $this->assertEquals($valLogin, $my->prepare($login));
        $this->assertEquals($valText, $my->prepare($text));
    }
}