-- MEDBRIDGE database schema

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    mot_de_passe_hash TEXT NOT NULL,
    role VARCHAR(20) CHECK (role IN ('medecin','mentor','admin')),
    pays_diplome VARCHAR(100),
    specialite VARCHAR(100),
    annee_diplome INT,
    statut_immigration VARCHAR(100),
    langue VARCHAR(50),
    province_cible VARCHAR(100),
    objectif VARCHAR(100),
    date_creation TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(200) NOT NULL,
    description TEXT,
    lien_utile TEXT,
    duree_estimee VARCHAR(50),
    type_ressource VARCHAR(50)
);

CREATE TABLE user_tasks (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    task_id INT REFERENCES tasks(id),
    statut VARCHAR(20) CHECK (statut IN ('a_faire','en_cours','termine')),
    date_debut DATE,
    date_fin DATE
);

CREATE TABLE qcm (
    id SERIAL PRIMARY KEY,
    examen VARCHAR(50),
    question TEXT,
    choix_a TEXT,
    choix_b TEXT,
    choix_c TEXT,
    choix_d TEXT,
    bonne_reponse CHAR(1),
    explication TEXT
);

CREATE TABLE user_qcm (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    qcm_id INT REFERENCES qcm(id),
    reponse CHAR(1),
    correcte BOOLEAN
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    titre VARCHAR(200),
    contenu TEXT,
    categorie VARCHAR(100),
    date_creation TIMESTAMP DEFAULT NOW()
);