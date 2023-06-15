import { FaculdadeApp } from "./api";
import { SqliteConnection } from "@external/sqlite_database";

/**
 *
 * Este é o arquivo inicial. A partir dele iniciamos todo o resto.
 * Aqui já definimos o banco de dados usado, e passamos na criação do
 *  da API.
 *
 */

const sqlconnection = new SqliteConnection(
  "/home/erick/work/fiap/fiap_cleanarch/ensino.sqlite3"
);
const faculdadeApp = new FaculdadeApp(sqlconnection);
faculdadeApp.start();
