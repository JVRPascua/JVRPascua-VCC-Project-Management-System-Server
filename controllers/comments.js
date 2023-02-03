import pool from '../db.js';

export const comment = async (req,res) => {
    const { id } = req.params;
    const { value } = req.body;
    const { userId } = req.query;
    const image = null;
    try {
        const newComment = await pool.query("INSERT INTO comments_tbl (comment_date, comment_text, comment_image, comment_user, task) VALUES(NOW(), $1, $2, $3, $4) RETURNING *", [value, image, userId, id]);

        res.json(newComment.rows[0]);
    } catch (error) {
        res.status(409).json({ error });
    }
}

export const getComments = async (req,res) => {
    try {
        const { id } = req.params;
        const commentsTask = await pool.query("SELECT comment_id, comment_date, comment_text, comment_image, comment_user, task FROM comments_tbl WHERE task = $1 ORDER BY comment_date", [id]);
        res.status(200).json(commentsTask.rows);
    } catch (error) {
        res.status(404).json({ error });
    } 
}