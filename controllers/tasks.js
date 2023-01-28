import pool from '../db.js';

export const getProjectTasks = async (req, res) => {
        try{
            const { page, userId } = req.query;
            const id = Number(userId);
            const limit = 6;
            const total = await pool.query("SELECT COUNT(projects_id) AS exact_count FROM projects_tbl");
            const totalProjectId = total.rows[0].exact_count;
            if(id === 1){
                const result = await pool.query("SELECT * FROM projects_tbl ORDER BY projects_id LIMIT $2 OFFSET (($1 - 1) * $2)",[page, limit]);
                res.status(200).json({ data: result.rows, currentPage: Number(page), numberOfPages: Math.ceil(totalProjectId / limit) });
            }
            else{
                const result = await pool.query("SELECT * FROM projects_tbl WHERE project_manager = $3 ORDER BY projects_id LIMIT $2 OFFSET (($1 - 1) * $2)",[page, limit, id]);
                const totalProjects = result.rowCount;
                res.status(200).json({ data: result.rows, currentPage: Number(page), numberOfPages: Math.ceil(totalProjects / limit) });
            }
        } catch (error) {
        res.status(404).json({ error });
    }
};

export const createProjectTasks = async (req, res) => {
    try {
        const { task_name, start_date, end_date, description, is_done, project } = req.body;
        const newProjectTask = await pool.query("INSERT INTO tasks_tbl (task_name, start_date, end_date, description, is_done, project) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [task_name, start_date, end_date, description, is_done, project]);

         res.json(newProjectTask.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error });
    }
};
