<?php

class Route
{
    static function start(): void
    {
        $controller_name = "Main";
        $action_name = "index";
        $routes = explode("/", $_SERVER["REQUEST_URI"]);
        if(!empty($routes[2]))
        {
            $controller_name = $routes[2];
        } 
        
        if(!empty($routes[3]))
        {
            $action_name = $routes[3];
        }
       
        $model_name = "Model_" . $controller_name;
        $controller_name = "Controller_" . $controller_name;
        $action_name = "action_" . $action_name;

        $model_file = strtolower($model_name) . ".php";
        $model_path = "app/models/" . $model_file;
        if(file_exists($model_path))
        {
            include $model_path;
        }
        $controller_file = strtolower($controller_name) . ".php";
        $controller_path = "app/controllers/" . $controller_file;

        if(file_exists($controller_path))
        {
            include $controller_path;
        }

        if(method_exists($controller_name, $action_name))
        {
            $controller = new $controller_name;
            $action = $action_name; 
            $controller->$action();
        }
    }
}