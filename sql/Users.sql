create table Users (
    id CHAR(36) NOT NULL,
    name VARCHAR(40) NOT NULL,
    username VARCHAR(20) NOT NULL,
    gender CHAR(1),
    dob DATE,
    bio VARCHAR(120),
    createTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
