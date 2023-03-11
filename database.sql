CREATE DATABASE vccpms;

CREATE TABLE users(
    users_id SERIAL PRIMARY KEY,
    is_admin BOOLEAN DEFAULT FALSE,
    role VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE projects_tbl(
    projects_id SERIAL PRIMARY KEY,
    project_name VARCHAR(255),
    budget VARCHAR(255),
    start_date DATE,
    end_date DATE,
    description VARCHAR(255),
    project_manager INT references users(users_id)
);

CREATE TABLE tasks_tbl(
    tasks_id SERIAL PRIMARY KEY,
    task_name VARCHAR(255),
    start_date DATE,
    end_date DATE,
    description VARCHAR(255),
    is_done BOOLEAN DEFAULT FALSE,
    priority INT,
    project INT references projects_tbl(projects_id),
    project_manager INT references users(users_id)
);

CREATE TABLE comments_tbl(
    comment_id SERIAL PRIMARY KEY,
    comment_date DATE,
    comment_text VARCHAR(1000),
    comment_image BYTEA,
    comment_user INT,
    task INT references tasks_tbl(tasks_id),
    project INT references projects_tbl(projects_id)
);


