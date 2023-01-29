import pool from '../db.js';

export const getProjectTasks = async (req, res) => {
        try{
            const { id } = req.params;

            const projectTasks = await pool.query("SELECT tasks_id, task_name, start_date, end_date, description, is_done, project FROM tasks_tbl WHERE project = $1", [id]);
            res.status(200).json(projectTasks.rows);
        } catch (error) {
        res.status(404).json({ error });
    }
};

export const createProjectTasks = async (req, res) => {
    try {
        const { task_name, start_date, end_date, description, project } = req.body;
        const is_done = false;
        const newProjectTask = await pool.query("INSERT INTO tasks_tbl (task_name, start_date, end_date, description, is_done, project) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [task_name, start_date, end_date, description, is_done, project]);

         res.json(newProjectTask.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(409).json({ error });
    }
};


