CREATE TABLE users(
    id int(11) not null,
    username varchar(16) not null,
    password varchar(60) not null,
    fullname varchar(100) not null
);

ALTER TABLE users
    add primary key (id);

ALTER TABLE users
    modify id int(11) not null AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE links(
    id int(11) not null,
    title varchar(150) not null,
    url varchar(255) not null,
    description text,
    user_id int(11),
    created_at timestamp not null default current_timestamp,
    constraint fk_user foreign key (user_id) references users(id)
);

ALTER TABLE links
    add primary key (id);

ALTER TABLE links
    modify id int(11) not null AUTO_INCREMENT, AUTO_INCREMENT = 1;