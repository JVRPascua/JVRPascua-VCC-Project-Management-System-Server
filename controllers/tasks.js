import pool from '../db.js';

export const getProjectTasks = async (req, res) => {
        try{
            const { id } = req.params;

            const projectTasks = await pool.query("SELECT tasks_id, task_name, start_date, end_date, description, is_done, project, priority FROM tasks_tbl WHERE project = $1 ORDER BY priority, end_date", [id]);
            res.status(200).json(projectTasks.rows);
        } catch (error) {
        res.status(404).json({ error });
    }
};

export const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await pool.query("SELECT tasks_id, task_name, start_date, end_date, description, priority FROM tasks_tbl WHERE tasks_id = $1", [id]);
        res.status(200).json(task.rows);
    } catch (error) {
        res.status(404).json({ error });
    }
}

export const createProjectTasks = async (req, res) => {
    try {
        const { task_name, start_date, end_date, description, project, priority } = req.body;
        const is_done = false;
        const newProjectTask = await pool.query("INSERT INTO tasks_tbl (task_name, start_date, end_date, description, is_done, project, priority) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", [task_name, start_date, end_date, description, is_done, project, priority]);

         res.json(newProjectTask.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(409).json({ error });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { task_name, start_date, end_date, description, priority} = req.body;
        const updateTask = await pool.query("UPDATE tasks_tbl SET task_name = $1, start_date = $2, end_date = $3 , description = $4, priority = $6 WHERE tasks_id = $5", [task_name, start_date, end_date, description, id, priority]);
        res.json("Task was updated");
    } catch (error) {
        res.status(404).send("No task with that ID");
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteTask = await pool.query("DELETE FROM tasks_tbl WHERE tasks_id = $1", [id]);

        res.json("Task was deleted");    
    } catch (error) {
        res.status(404).send("No task with that ID");
    }
}
