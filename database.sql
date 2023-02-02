CREATE DATABASE vccpms;

CREATE TABLE users(
    users_id SERIAL PRIMARY KEY,
    is_admin BOOLEAN DEFAULT FALSE,
    role VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255)
);


INSERT INTO users (is_admin, role, username, password) VALUES (
    TRUE,
    'Owner/General Manager',
    'vccgm',
    crypt('VCCGMPMS2022', gen_salt('bf'))
);

INSERT INTO users (is_admin, role, username, password) VALUES (
    FALSE,
    'Project Manager 1',
    'vccpm1',
    crypt('VCCPM1PMS2022', gen_salt('bf'))
);

INSERT INTO users (is_admin, role, username, password) VALUES (
    FALSE,
    'Project Manager 2',
    'vccpm2',
    crypt('VCCPM22PMS2022', gen_salt('bf'))
);

INSERT INTO users (is_admin, role, username, password) VALUES (
    FALSE,
    'Project Manager 3',
    'vccpm3',
    crypt('VCCPM333PMS2022', gen_salt('bf'))
);

INSERT INTO users (is_admin, role, username, password) VALUES (
    FALSE,
    'Project Manager 4',
    'vccpm4',
    crypt('VCCPM4444PMS2022', gen_salt('bf'))
);

INSERT INTO users (is_admin, role, username, password) VALUES (
    FALSE,
    'Project Manager 5',
    'vccpm5',
    crypt('VCCPM55555PMS2022', gen_salt('bf'))
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
    project INT references projects_tbl(projects_id)
);

INSERT INTO tasks_tbl (task_name, start_date, end_date, description, is_done, project) VALUES (
    sample,
    2023-01-01,
    2023-02-08,
    'hi',
    FALSE,
    2
);

ALTER TABLE tasks_tbl  
ADD COLUMN priority INT;