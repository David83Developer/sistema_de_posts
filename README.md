TABELAS NO BANCO DE DADOS:



```sql

CREATE DATABASE sistemadeposts;

USE sistemadeposts;

CREATE TABLE users(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name CHAR(100) NOT NULL,
    email CHAR(100) NOT NULL,
    ageDate char(50) NOT NULL,
    password (100) NOT NULL,

    CONSTRAINT name UNIQUE(name)
);

CREATE TABLE post(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_post CHAR(100) NOT NULL,
    name_post CHAR(100) NOT NULL,
    content TEXT NOT NULL,
    likes INT NOT NULL DEFAULT(0),
    dislikes INT NOT NULL DEFAULT(0),
    numberComents INT NOT NULL DEFAULT(0),
    edited char(10) DEFAULT(''),
    data_post char(50) NOT NULL,

    CONSTRAINT FOREIGN KEY(user_post) REFERENCES users(name)
);

CREATE TABLE coments(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_post CHAR(100) NOT NULL,
    content TEXT NOT NULL,
    data_post char(50) NOT NULL,
    id_post INT NOT NULL,

    CONSTRAINT FOREIGN KEY(user_post) REFERENCES users(name),
    FOREIGN KEY(id_post) REFERENCES post(id)
);

CREATE TABLE setliked(
    id INT NOT NULL AUTO_INCREMENT,
    cod_user INT NOT NULL,
    cod_post INT NOT NULL,

    FOREIGN KEY(cod_user) REFERENCES users(id),
    FOREIGN KEY(cod_user) REFERENCES post(id),
)

CREATE TABLE setdisliked(
    id INT NOT NULL AUTO_INCREMENT,
    cod_user INT NOT NULL,
    cod_post INT NOT NULL,

    FOREIGN KEY(cod_user) REFERENCES users(id),
    FOREIGN KEY(cod_user) REFERENCES post(id),
)

```