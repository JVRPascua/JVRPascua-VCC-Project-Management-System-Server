import pool from '../db.js';

export const getProjects = async (req, res) => {
        try{
            const { page } = req.query;
            const limit = 6;
            const total = await pool.query("SELECT COUNT(projects_id) AS exact_count FROM projects_tbl");
            const totalProjectId = total.rows[0].exact_count;
            const result = await pool.query("SELECT * FROM projects_tbl ORDER BY projects_id LIMIT $2 OFFSET (($1 - 1) * $2)",[page, limit]);

            res.status(200).json({ data: result.rows, currentPage: Number(page), numberOfPages: Math.ceil(totalProjectId / limit) });
        //    res.status(200).json(result.rows);
            
        } catch (error) {
        res.status(404).json({ error });
    }
};

//const client = await pool.connect(); // creates connection
//        const { page, size } = req.query;
//        const query = `
//                SELECT *
//                FROM "users"
//                ORDER BY "users"."id"
//                LIMIT $2
//                OFFSET (($1 - 1) * $2);
//        `;
//        try {
//            const { rows } = await client.query(query, [page, size]); // sends query
//            res.status(200).json(rows);

export const getProjectsBySearch = async (req, res) => {
    const { searchQuery } = req.query;

    try {
        const projects = await pool.query("SELECT projects_id, project_name, budget, start_date, end_date, description, project_manager FROM projects_tbl WHERE project_name = $1", [searchQuery]);

        res.status(200).json(projects.rows);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createProjects = async (req, res) => {
    try {
        const { project_name, budget, start_date, end_date, description, project_manager } = req.body;
        const newProject = await pool.query("INSERT INTO projects_tbl (project_name, budget, start_date, end_date, description, project_manager) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [project_name, budget, start_date, end_date, description, project_manager]);

         res.json(newProject.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error });
    }
};

export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { project_name, budget, start_date, end_date, description, project_manager } = req.body;
        const updateProject = await pool.query("UPDATE projects_tbl SET project_name = $1, budget = $2, start_date = $3, end_date = $4 , description = $5 , project_manager = $6 WHERE projects_id = $7", [project_name, budget, start_date, end_date, description, project_manager, id]);
        res.json("Project was updated");
    } catch (error) {
        res.status(404).send("No project with that ID");
    }
}

export const deleteProject = async (req, res) => {

    try {
        const { id } = req.params;
        const deleteProject = await pool.query("DELETE FROM projects_tbl WHERE projects_id = $1", [id]);
        res.json("Project was deleted");    
    } catch (error) {
        res.status(404).send("No project with that ID");
    }


}