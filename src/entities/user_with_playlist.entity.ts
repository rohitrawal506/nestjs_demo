import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    name:"user_playlist",
    expression:`
            SELECT "user".id AS user_id,
                   "user".firstname AS user_firstname,
                   playlist.id AS playlist_id,
                   playlist.name AS playlist_name
            FROM "user"
            LEFT OUTER JOIN playlist ON playlist.user_id = "user".id;
    `,
})
export class UserWithPlayList{
    @ViewColumn()
    user_id:number;

    @ViewColumn()
    user_firstname : string;

    @ViewColumn()
    playlist_id  :number;

    @ViewColumn()
    playlist_name : string;
}
