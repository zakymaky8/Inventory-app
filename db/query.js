const pool = require('./pool');

const getArtists = async function () {
    const { rows } = await pool.query("SELECT * FROM artists;")
    return rows;
}

const addArtist = async function (name, country, album_count) {// to be tracked
    const {isThereThatName} = await pool.query(`SELECT artist_name FROM artists WHERE artist_name = '${name}'`)
    if (isThereThatName) {
        console.log(isThereThatName)
    } else await pool.query(`INSERT INTO artists (artist_name, country, album_count) VALUES ($1, $2, $3)`, [name, country, album_count])
}

const addAlbum = async function (entries) {
    const {rows} = await pool.query(`SELECT artists_id FROM artists AS art WHERE art.artist_name = '${entries.artist_name}'`);
    await pool.query(`INSERT INTO albums(
                                            album_title,
                                            album_genres,
                                            album_release_year,
                                            cover_url,
                                            most_fav_tracks,
                                            album_personal_rating,
                                            album_description,
                                            artist_id)

                                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                                 [
                                    entries.album_title, 
                                    entries.genre, 
                                    entries.release_year, 
                                    entries.cover_url,
                                    entries.most_fav_track,
                                    entries.personal_rating,
                                    entries.description,
                                    rows[0].artists_id
                                ]);
}

const getAllAlbums = async function() {
    const  { rows } = await pool.query(`SELECT * FROM albums JOIN artists ON albums.artist_id = artists.artists_id;`);
    return rows;
}


const  getAllSingles= async function() {
    const { rows } = await pool.query(`SELECT * FROM singles INNER JOIN artists  ON singles.artist_id = artists.artists_id;`);
    return rows;
}

const addSingle = async function(entries) {
    const { rows } = await pool.query(`SELECT artists_id FROM artists AS art WHERE art.artist_name = '${entries.artist_name}'`);
    await pool.query(`INSERT INTO singles (
                                    music_title,
                                    genre,
                                    release_year,
                                    personal_rating,
                                    description,
                                    artist_id)
                     VALUES ($1, $2, $3, $4, $5, $6)`,
                                [
                                    entries.music_title,
                                    entries.genre,
                                    entries.release_year,
                                    entries.personal_rating,
                                    entries.description,
                                    rows[0].artists_id
                                ]);

}

const addMusicFromAlbum = async function(entries) {
    const id1 = await pool.query(`SELECT artists_id FROM artists AS art WHERE art.artist_name = '${entries.artist_name}'`);
    const id2 = await pool.query(`SELECT albums_id FROM albums AS alb WHERE alb.album_title = '${entries.album_name}'`);

    await pool.query(`INSERT INTO music_from_album (
                                                music_title,
                                                genre,
                                                personal_rating,
                                                description,
                                                album_id,
                                                artist_id)
                    VALUES ($1, $2, $3, $4, $5, $6)`, 
                                [
                                    entries.music_title,
                                    entries.genre,
                                    entries.personal_rating,
                                    entries.description,
                                    id2.rows[0].albums_id,
                                    id1.rows[0].artists_id
                                ]);

}

const getMusicFromAlbum_fromdb = async function() {
    const  { rows } = await pool.query(`SELECT * FROM music_from_album JOIN artists ON artists.artists_id = music_from_album.artist_id JOIN albums ON albums.albums_id =  music_from_album.album_id;`)
    return rows;
}

const get_albums_fromdb = async function () {
    const { rows } = await pool.query("SELECT * FROM albums;")
    return rows;
}

const getEveryMusic = async function() {
    const from_album_music = await getMusicFromAlbum_fromdb();
    const single = await getAllSingles();
    const all_music = [...single, ...from_album_music]

    return all_music;
}

const fetchTopRatedItemsFrom_db = async function() {
    // const singles = await getAllSingles();
    const albums = await getAllAlbums();
    // const musicFromAlbum = await getMusicFromAlbum_fromdb();
    // const topRatedSingle = singles.filter(single => Number(single.personal_rating) > 8);
    const topRatedALbums = albums.filter(album => Number(album.album_personal_rating) >= 8);
    // const topRatedMfa = musicFromAlbum.filter(mfa => Number(mfa.personal_rating) > 8)
    const allTopRatedAlbums = [...topRatedALbums]
    return allTopRatedAlbums
}


function sliceAndNumfy(year)  {
    return Number(year.slice(0, 4))
}

const get90s_from_db = async function () {
    const all_music = await getEveryMusic();
    const _90s = all_music.filter(music => music.release_year ? (sliceAndNumfy(music.release_year) < 2000) && (sliceAndNumfy(music.release_year) > 1990) : music.album_release_year ? sliceAndNumfy(music.album_release_year) <= 2000 && sliceAndNumfy(music.album_release_year) >= 1990 : null)
    return _90s;
}


const getAllMusicFromOneAlbum = async function(album_name) {
    const from_album_music = await getMusicFromAlbum_fromdb();
    const from_album =  from_album_music.filter(music => music.album_title === album_name);
    return from_album;
}

const deleteAlbumRecord = async function (album_id) {
    await pool.query(`DELETE FROM music_from_album WHERE album_id = ${album_id}`);
    await pool.query(`DELETE FROM albums WHERE albums_id = ${album_id}`);
}

const deleteSingleRecord = async function (single_id) {
    await pool.query(`DELETE FROM singles WHERE singles_id = ${single_id}`);
}


const deleteMusicFromAlbumRecord = async function (mfa_id) {
    await pool.query(`DELETE FROM music_from_album WHERE mfa_id = ${mfa_id}`);
}



const updateSingle = async function(entries, sgl_id) {
    const { rows } = await pool.query(`SELECT artists_id FROM artists WHERE artist_name = '${entries.artist_name}'`);
    await pool.query(
        `UPDATE singles
          SET
            music_title = $1,
            genre = $2,
            release_year = $3,
            personal_rating = $4,
            description = $5,
            artist_id = $6
          WHERE singles_id = $7`,
                [
                    entries.music_title,
                    entries.genre,
                    entries.release_year,
                    entries.personal_rating,
                    entries.description,
                    rows[0].artists_id,
                    sgl_id
              ]
      );
      

   console.log("Updating done ....");
}



const updateAlbum = async function(entries, alb_id) {
    const { rows } = await pool.query(`SELECT artists_id FROM artists WHERE artist_name = '${entries.artist_name}'`);
    await pool.query(`UPDATE albums
                          SET
                          album_title = $1,
                          album_genres = $2,
                          album_release_year = $3,
                          cover_url = $4,
                          album_personal_rating = $5,
                          most_fav_tracks = $6,
                          album_description = $7,
                          artist_id= $8

                          WHERE albums_id = $9`,
                              [
                                entries.album_title,
                                entries.genre,
                                entries.release_year,
                                entries.cover_url,
                                entries.personal_rating,
                                entries.most_fav_track,
                                entries.description,
                                rows[0].artists_id,
                                alb_id
                            ]);

   console.log("Updating done ....");
}

const updateMusicFromAlbum = async function(entries, mfa_id) {
    const { rows } = await pool.query(`SELECT artists_id FROM artists WHERE artist_name = '${entries.artist_name}'`);
    const albid = await pool.query(`SELECT albums_id FROM albums WHERE album_title = '${entries.album_name}'`);
    console.log(albid.rows);
    
    await pool.query(`UPDATE music_from_album
                          SET
                          music_title= $1,
                          genre = $2,
                          personal_rating = $3,
                          description = $4,
                          artist_id = $5,
                          album_id = $6

                        WHERE mfa_id = $7`, [
                                entries.music_title,
                                entries.genre,
                                entries.personal_rating,
                                entries.description,
                                rows[0].artists_id,
                                albid.rows[0].albums_id,
                                mfa_id
                            ]);

   console.log("Updating done ....");
}

const fetchSearchResult = async (search_key, type) => {
    const albums = await pool.query(`SELECT * FROM albums AS alb JOIN artists AS art ON art.artists_id = alb.artist_id WHERE alb.album_title LIKE $1 `, [`%${search_key}%`]);
    const singles = await pool.query(`SELECT * FROM singles AS sgl JOIN artists AS art ON art.artists_id = sgl.artist_id  WHERE sgl.music_title LIKE $1`, [`%${search_key}%`] )
    const musicFromAlbum = await pool.query(`SELECT * FROM music_from_album AS mfa JOIN artists AS art ON art.artists_id = mfa.artist_id JOIN albums AS alb ON alb.albums_id =  mfa.album_id WHERE mfa.music_title LIKE $1`, [`%${search_key}%`] )
    if (type === "all") {
        console.log([...albums.rows, ...singles.rows, ...musicFromAlbum.rows]);
        
    }
    return type === "albums" ? albums.rows : type === "singles" ? singles.rows : type === 'from album' ? musicFromAlbum.rows : [...albums.rows, ...singles.rows, ...musicFromAlbum.rows]
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
    getAllMusicFromOneAlbum,
    deleteAlbumRecord,
    deleteSingleRecord,
    deleteMusicFromAlbumRecord,
    updateSingle,
    updateAlbum,
    updateMusicFromAlbum,
    fetchTopRatedItemsFrom_db,
    fetchSearchResult
}