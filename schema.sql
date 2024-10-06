DROP TABLE IF EXISTS moviereview_reviews CASCADE;
DROP TABLE IF EXISTS moviereview_media;

CREATE TABLE moviereview_media
(
    id          INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title        VARCHAR(256) NOT NULL,
    type        INT2 DEFAULT 0, -- 0 - TV 1 - Movie 2 - anime?
    released    DATE,
    finished    DATE,
    description TEXT,
    img         VARCHAR(2048)
);
CREATE TABLE IF NOT EXISTS moviereview_reviews
(
    id      INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    movie   INT REFERENCES moviereview_media (id),
    name    VARCHAR(255) NOT NULL,
    comment TEXT,
    rating  INT
);

CREATE TABLE IF NOT EXISTS moviereview_genres
(
    id   INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL UNIQUE
);


CREATE TABLE IF NOT EXISTS moviereview_media_genre
(
    media INT REFERENCES moviereview_media (id),
    genre INT REFERENCES moviereview_genres (id),
    PRIMARY KEY (media, genre)
);

CREATE INDEX moviereview_genres_imovie ON moviereview_media_genre (media);

INSERT INTO moviereview_genres (name)
VALUES ('Action'),
       ('Adventure'),
       ('Comedy'),
       ('Drama'),
       ('Romance'),
       ('Fantasy'),
       ('Science Fiction (Sci-Fi)'),
       ('Mystery'),
       ('Thriller'),
       ('Horror'),
       ('Crime'),
       ('Historical'),
       ('Supernatural'),
       ('Slice of Life'),
       ('Psychological'),
       ('Shounen'),
       ('Shoujo'),
       ('Mecha'),
       ('Sports'),
       ('Martial Arts'),
       ('Military'),
       ('Post-Apocalyptic'),
       ('Western'),
       ('Spy'),
       ('Family'),
       ('Musical'),
       ('Biography'),
       ('Documentary'),
       ('War'),
       ('Noir'),
       ('Legal'),
       ('Political'),
       ('Medical'),
       ('Cyberpunk'),
       ('Steampunk'),
       ('Paranormal'),
       ('Magic'),
       ('School'),
       ('Isekai'),
       ('Detective'),
       ('Survival'),
       ('Dark Fantasy'),
       ('Coming-of-Age'),
       ('Dystopian'),
       ('Tragedy') ON CONFLICT DO NOTHING ;


INSERT INTO moviereview_media (type, title, released, finished, description, img)
VALUES (0, 'Why Women Kill', '2019-08-15', '2021-07-29',
        'An anthology series that follows three women in different decades all living in the same house, as they deal with infidelity and betrayals in their marriages.',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPcKqf1Z8lPwRyI6ViiJUPyQmh6GmhYbKw8UlzpMexqNG8e406'),
       (0, '2 Broke Girls', '2011-09-19', '2017-04-17',
        'Two young women waitressing at a greasy spoon diner strike up an unlikely friendship in the hopes of launching a successful business - if only they can raise the cash.',
        'https://m.media-amazon.com/images/M/MV5BMTYxMDA3Mzg5NV5BMl5BanBnXkFtZTgwNDIxOTcwMDI@._V1_.jpg'),
       (0, 'The Lord of the Rings: The Rings of Power', '2022-09-02', NULL, 'Evil has had many names.
Beginning in a time of relative peace, we follow an ensemble cast of characters as they confront the re-emergence of evil to Middle-earth. From the darkest depths of the Misty Mountains, to the majestic forests of Lindon, to the breathtaking island kingdom of Númenor, to the furthest reaches of the map, these kingdoms and characters will carve out legacies that live on long after they are gone.',
        'https://m.media-amazon.com/images/M/MV5BNmVmZGQ2ZTctYzE4NC00YzkxLThhNjYtNGIyZjJmZGEwMjUzXkEyXkFqcGc@._V1_.jpg');


CREATE PROCEDURE insert_genre(mediaName varchar(255), genreName varchar(255))
    LANGUAGE SQL
AS
$$
INSERT INTO moviereview_media_genre(media, genre) VALUES ((SELECT id FROM moviereview_media WHERE title = mediaName), (SELECT id FROM moviereview_genres WHERE name = genreName))
$$;

CALL insert_genre('Why Women Kill', 'Comedy');
CALL insert_genre('Why Women Kill', 'Crime');
CALL insert_genre('Why Women Kill', 'Drama');
