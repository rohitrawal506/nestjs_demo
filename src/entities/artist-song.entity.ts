import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    name: "artist_song",
    expression: `
        SELECT
            artist.id AS artist_id,
            "user".firstname AS artist_name,
            song.id AS song_id,
            song.title AS song_name
        FROM artist
        INNER JOIN "user" ON artist.user_id = "user".id
        LEFT OUTER JOIN song_artist ON song_artist.artist_id = artist.id
        LEFT OUTER JOIN song ON song_artist.song_id = song.id;
    `,
})
export class ArtistSongEntity {
    @ViewColumn()
    artist_id: number;

    @ViewColumn()
    artist_name: string;

    @ViewColumn()
    song_id: number;

    @ViewColumn()
    song_name: string;
}
