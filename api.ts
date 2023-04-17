import axios from "axios";
import { Room } from "./types/socket";

export const fetchGames = async (id: String) =>
  await axios.get(`/api/game/${id}`);

export const fetchResults = async (id: String) =>
  await axios.get(`/api/results/${id}`);

export const saveGame = async (game: Room) =>
  await axios.post(`/api/game/saveGame`, game);
