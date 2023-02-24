import pool from '../db.js';

export const getTasks = async (req, res) => {
    try{
        const { id } = req.params;
        const userId = Number(id);
        if(userId === 1){
            const tasks = await pool.query("SELECT * FROM tasks_tbl ORDER BY priority, end_date");
            res.status(200).json(tasks.rows);
        } else {
            const tasks = await pool.query("SELECT * FROM tasks_tbl WHERE project_manager = $1 ORDER BY priority, end_date", [userId]);
            res.status(200).json(tasks.rows);
        }
    } catch (error) {
    res.status(404).json({ error });
}
};

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
        const task = await pool.query("SELECT tasks_id, task_name, start_date, end_date, description, priority, is_done, project FROM tasks_tbl WHERE tasks_id = $1", [id]);
        res.status(200).json(task.rows);
    } catch (error) {
        res.status(404).json({ error });
    }
}

export const createProjectTasks = async (req, res) => {
    const { task_name, start_date, end_date, description, project, priority, projectManager } = req.body;
    const is_done = false;
    try {
        if(project && projectManager){
            const newProjectTask = await pool.query("INSERT INTO tasks_tbl (task_name, start_date, end_date, description, is_done, project, priority, project_manager) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [task_name, start_date, end_date, description, is_done, project, priority, projectManager]);
            res.json(newProjectTask.rows[0]);
        }
    } catch (error) {
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

export const doneTask = async (req, res) => {
    const { id } = req.params;
    try {
        const doneTask = await pool.query("UPDATE tasks_tbl SET is_done = $1 WHERE tasks_id = $2", [true, id]);
        res.json("Task was updated");
    } catch (error) {
        res.status(404).send("No task with that ID");
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteComments = await pool.query("DELETE FROM comments_tbl WHERE task = $1", [id]);
        const deleteTask = await pool.query("DELETE FROM tasks_tbl WHERE tasks_id = $1", [id]);
        res.json("Task was deleted");    
    } catch (error) {
        res.status(404).send("No task with that ID");
    }
}
