<?php
use PHPUnit\Framework\TestCase;
require_once "../core/model.php";
require_once "../core/controller.php";
require_once "../core/route.php";
require_once "../models/model_user.php";
require_once "../models/model_database.php";
//include '../app/models/model_database.php';
final class Model_User_Test extends TestCase
{       
    public function testPrepare()
    {   
        $pas1 = '123456';
        $pas2 = 'aAAaAA';
        $pas1Val; 
        $pas2Val;

        $my = new Model_User(0);
        $pas1Val = md5(htmlspecialchars($pas1));
        $this->assertEquals($pas1Val, $my->preparePswd($pas1));
        $pas2Val = md5(htmlspecialchars($pas2));
        $this->assertEquals($pas2Val, $my->preparePswd($pas2));
    }
}