const pool = require('./pool');

const getArtists = async function () {
    const { rows } = await pool.query("SELECT * FROM artists;")
    return rows;
}

const addArtist = async function (name, country, album_count) {
    const {isThereThatName} = await pool.query(`SELECT artist_name FROM artists WHERE artist_name = '${name}'`)
    if (isThereThatName) {
        console.log(isThereThatName)
    } else await pool.query(`INSERT INTO artists (artist_name, country, album_count) VALUES ($1, $2, $3)`, [name, country, album_count])
}

const addAlbum = async function (entries) {
    const {rows} = await pool.query(`SELECT id FROM artists AS art WHERE art.artist_name = '${entries.artist_name}'`);
    await pool.query(`INSERT INTO albums (album_title, album_genres, album_release_year, cover_url, most_fav_tracks, album_personal_rating, album_description, artist_id)

                     VALUES ('${entries.album_title}',
                            '${entries.genre}',
                            '${entries.release_year}',
                            '${entries.cover_url}',
                            '${entries.most_fav_track}',
                            '${entries.personal_rating}',
                            '${entries.description}',
                            '${rows[0].id}');`)
}
// secure entries

const getAllAlbums = async function() {
    const  { rows } = await pool.query(`SELECT * FROM albums INNER JOIN artists ON albums.artist_id = artists.id;`)
    return rows;
}


const  getAllSingles= async function() {
    const { rows } = await pool.query(`SELECT * FROM singles JOIN artists ON singles.artist_id = artists.id;`);
    return rows;
}

const addSingle = async function(entries) {
    const { rows } = await pool.query(`SELECT id FROM artists AS art WHERE art.artist_name = '${entries.artist_name}'`);
    console.log(rows)
    await pool.query(`INSERT INTO singles (music_title, genre, release_year, personal_rating, description, artist_id)

                     VALUES ('${entries.music_title}',
                            '${entries.genre}',
                            '${entries.release_year}',
                            '${entries.personal_rating}',
                            '${entries.description}',
                            '${rows[0].id}');`)
}

module.exports = {
    getArtists,
    addArtist,
    addAlbum,
    getAllAlbums,
    getAllSingles,
    addSingle
}



// id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
// music_title TEXT NOT NULL,
// genre TEXT,
// release_year  VARCHAR ( 10 ),
// personal_rating INTEGER,
// description TEXT,
// artist_id INTEGER
//    await pool.query(`INSERT INTO albums (album_title, album_genres, album_release_year, cover_url, most_fav_tracks, album_personal_rating, album_description, artist_id)

//                      VALUES ($1, $2, $3, $4, $5, $6, $7, SELECT id FROM artists AS art WHERE art.name = '${entries.artis_name}'; );`

//                      ,[entries.album_title, entries.genre, entries.release_year, entries.cover_url, entries.most_fav_track, entries.personal_rating, entries.description])
// }


// id | music_title |  genre  | release_year | personal_rating |                                    description                                    | artist_id 
// ----+-------------+---------+--------------+-----------------+-----------------------------------------------------------------------------------+-----------
//   1 | Jegna       | Country | 2014 EC      |               9 | አላዝን አላዝን ግልፁን ልንገርሽ ወኔ አጥቼ አይደለም የታማሁብሽ ከንቱ ቢለፈልፍ ተናግሮ አናጋሪ የወደደ አይደለም የጠላ ነው ፈሪ |         1
// (1 row)

// ...skipping...
//  id | music_title |  genre  | release_year | personal_rating |                                    description                                    | artist_id 
// ----+-------------+---------+--------------+-----------------+-----------------------------------------------------------------------------------+-----------
//   1 | Jegna       | Country | 2014 EC      |               9 | አላዝን አላዝን ግልፁን ልንገርሽ ወኔ አጥቼ አይደለም የታማሁብሽ ከንቱ ቢለፈልፍ ተናግሮ አናጋሪ የወደደ አይደለም የጠላ ነው ፈሪ |         1
// (1 row)

// ~
// (END)