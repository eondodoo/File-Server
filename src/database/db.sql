DROP TABLE inventory IF EXISTS

-- Create a new database called 'inventory'
CREATE DATABASE inventory

CREATE TABLE users(
    id SERIAL NOT NULL,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'user' CHECK(role IN('admin', 'user')),
    password TEXT NOT NULL
);

CREATE TABLE items(
    id SERIAL NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    imgurl TEXT NOT NULL,
    downloads INTEGER NOT NULL,
    created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users
ADD CHECK(role IN ('admin', 'user'));

ALTER TABLE items
RENAME COLUMN download TO downloads;

UPDATE items
SET downloads = 0 WHERE id = 1;

ALTER TABLE items
ALTER COLUMN downloads SET NOT NULL;

DELETE FROM users
WHERE id = 1;

SELECT * FROM items WHERE name ILIKE '%admission%';

INSERT INTO items (name, description, imgurl, downloads)
VALUES ('Admission', 'Admision forms for all universities around the world', 'appointmentletter.pdf', 0);