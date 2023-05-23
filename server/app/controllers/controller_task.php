<?php

class Controller_Task extends Controller
{
    function __construct()
    {
        $this->model = new Model_Task;
    }

    function action_initial()
    {
        $this->model->initial_tasks();
    }

    function action_add()
    {
        $this->model->add_task();
    }

    function action_delete()
    {
        $this->model->delete_task();
    }

    function action_update()
    {
        $this->model->update_status();
    }

}