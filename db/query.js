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

const addMusicFromAlbum = async function(entries) {
    const id1 = await pool.query(`SELECT id FROM artists AS art WHERE art.artist_name = '${entries.artist_name}'`);
    const id2 = await pool.query(`SELECT id FROM albums AS alb WHERE alb.album_title = '${entries.album_name}'`);

    await pool.query(`INSERT INTO music_from_album (music_title, genre, personal_rating, description, album_id, artist_id)

                     VALUES ('${entries.music_title}',
                            '${entries.genre}',
                            '${entries.personal_rating}',
                            '${entries.description}',
                            '${id2.rows[0].id}',
                            '${id1.rows[0].id}');`)
}

const getMusicFromAlbum_fromdb = async function() {
    const  { rows } = await pool.query(`SELECT * FROM music_from_album JOIN artists ON artists.id  =  music_from_album.artist_id JOIN albums ON albums.id =  music_from_album.album_id;`) // for the time being
    return rows;
}

const get_albums_fromdb = async function () {
    const { rows } = await pool.query("SELECT * FROM albums;")
    return rows;
}

const getEveryMusic = async function() {
    const  singles = await getAllSingles()
    const from_album_music = await getMusicFromAlbum_fromdb();
    const all_music = [...singles, ...from_album_music];
    return all_music;
}

function sliceAndNumfy(year)  {
    return Number(year.slice(0, 4))
}

const get90s_from_db = async function () {
    const all_music = await getEveryMusic();
    const _90s = all_music.filter(music => music.release_year ? (sliceAndNumfy(music.release_year) < 2000) && (sliceAndNumfy(music.release_year) > 1990) : music.album_release_year ? sliceAndNumfy(music.album_release_year) < 2000 && sliceAndNumfy(music.album_release_year) > 1990 : null)
    return _90s;
}


const getAllMusicFromOneAlbum = async function(album_name) {
    const from_album_music = await getMusicFromAlbum_fromdb();
    const from_album =  from_album_music.filter(music => music.album_title === album_name);
    return from_album;
}

module.exports = {
    getArtists,
    addArtist,
    addAlbum,
    getAllAlbums,
    getAllSingles,
    addSingle,
    get_albums_fromdb,
    addMusicFromAlbum,
    getMusicFromAlbum_fromdb,
    getEveryMusic,
    get90s_from_db,
    getAllMusicFromOneAlbum
}
// INSERT INTO music_from_album (music_title, genre, personal_rating, description, album_id, artist_id) VALUES ('saltel das', 'Country', 9, 'good music', 1, 1);

//    await pool.query(`INSERT INTO albums (album_title, album_genres, album_release_year, cover_url, most_fav_tracks, album_personal_rating, album_description, artist_id)

//                      VALUES ($1, $2, $3, $4, $5, $6, $7, SELECT id FROM artists AS art WHERE art.name = '${entries.artis_name}'; );`

//                      ,[entries.album_title, entries.genre, entries.release_year, entries.cover_url, entries.most_fav_track, entries.personal_rating, entries.description])
// }