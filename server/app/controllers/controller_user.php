<?php

class Controller_User extends Controller
{
    function __construct()
    {
        $this->model = new Model_User;
    }

    function action_register()
    {
        $this->model->register();
    }
}