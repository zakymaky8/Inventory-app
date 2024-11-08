const { Client } = require("pg");
require("dotenv").config();


const SQL = `
    CREATE TABLE IF NOT EXISTS artists (
        artists_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        artist_name  VARCHAR(30) NOT NULL,
        country VARCHAR(50),
        album_count INTEGER
    );

    INSERT INTO artists (artist_name, country, album_count) VALUES ('Mastewal Eyayu', 'Ethiopia', 1);

    CREATE TABLE IF NOT EXISTS albums (
        albums_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        album_title TEXT NOT NULL,
        album_genres TEXT,
        album_release_year  VARCHAR(10),
        cover_url TEXT,
        most_fav_tracks TEXT,
        album_personal_rating INTEGER,
        album_description TEXT,
        artist_id INTEGER REFERENCES Artists (artists_id)
    );
    
    INSERT INTO albums (album_title, album_genres, album_release_year, cover_url, most_fav_tracks, album_personal_rating, album_description, artist_id)
    VALUES ('Enzira', 'Afrobeats', '2016 EC', 'someurl.com', 'Saltel Das', 8, 'Enzira is a music album released in 2024. Enzira has 14 songs sung by Mastewal Eyayu', 1);

    CREATE TABLE IF NOT EXISTS Singles (
        singles_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        music_title TEXT NOT NULL,
        genre TEXT,
        release_year  VARCHAR ( 10 ),
        personal_rating INTEGER,
        description TEXT,
        artist_id INTEGER REFERENCES Artists (artists_id)
    );
    INSERT INTO singles (music_title, genre, release_year, personal_rating, description, artist_id) VALUES ('Jegna', 'Country', '2014 EC', 9, 'nice music', 1);

    CREATE TABLE IF NOT EXISTS music_from_album (
        mfa_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        music_title TEXT NOT NULL,
        genre TEXT,
        personal_rating INTEGER,
        description TEXT,
        album_id INTEGER REFERENCES albums(albums_id),
        artist_id INTEGER REFERENCES Artists(artists_id)
    );
    INSERT INTO music_from_album (music_title, genre, personal_rating, description, album_id, artist_id) VALUES ('saltel das', 'Country', 9, 'good music', 1, 1);
    `
    
async function main () {
    console.log('seeding ...');
    const client = new Client({
        connectionString: `${process.env.LOCAL_DB_URL}`,
    });
    await client.connect();
    await client.query(SQL);
    await client.end()
    console.log("Done!")
}

main()
// https://e-cdn-images.dzcdn.net/images/artist/107d2aaf9082af8c2cb2b99f148ae333/500x500-000000-80-0-0.jpg