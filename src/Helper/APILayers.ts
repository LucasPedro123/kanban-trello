import { useEffect } from "react";
import { IBoard, ICard } from "../Interfaces/Kanban";

import axios from "axios"; // Biblioteca para chamadas HTTP

const API_BASE_URL = "https://system-trello-register.onrender.com/api"; // Substitua pelo seu endpoint

export class BoardAPI {
  async fetchBoardList(): Promise<IBoard[]> {
    // Busca a lista de boards do backend
    const response = await axios.get(`${API_BASE_URL}/boards`);
    return response.data;
  }

  async createBoard(board: IBoard): Promise<IBoard> {
    // Cria um novo board no backend
    const response = await axios.post(`${API_BASE_URL}/boards`, board);
    return response.data;
  }

  async updateBoard(boardId: number, updatedBoard: IBoard): Promise<IBoard> {
    // Atualiza um board no backend
    const response = await axios.put(`${API_BASE_URL}/boards/${boardId}`, updatedBoard);
    return response.data;
  }

  async deleteBoard(boardId: number): Promise<void> {
    // Deleta um board no backend
    await axios.delete(`${API_BASE_URL}/boards/${boardId}`); // Use boardId correto
  }

  async createCard(boardId: number, card: Partial<ICard>): Promise<ICard> {
    if (!boardId) {
      throw new Error("Board ID is required"); // Certifique-se de que há um ID
    }

    if (!card.title) {
      throw new Error("Card title is required"); // Certifique-se de que há um título
    }


    console.log("Creating card with data:", card); // Para depurar se os dados estão corretos
    const response = await axios.post(`${API_BASE_URL}/boards/${boardId}/cards`, {
      title: card.title,
      tasks: card.tasks,
      labels: card.labels,
      desc: card.desc,
      date: card.date
      // Passe outros campos necessários, mas sem `_id`
    });
    return response.data;

  }
  

  async updateCard(boardId: number, cardId: number, card: ICard): Promise<ICard> {
    console.log('Atualizando card:', boardId, cardId, card); // Depuração
    const response = await axios.put(
      `${API_BASE_URL}/boards/${boardId}/cards/${cardId}`,
      card
    );
    return response.data;
  }

  async deleteCard(boardId: number, cardId: number): Promise<void> {
    // Deleta um card de um board
    await axios.delete(`${API_BASE_URL}/boards/${boardId}/cards/${cardId}`);
  }
}

export async function fetchBoardList(): Promise<IBoard[]> {
  const api = new BoardAPI();
  return api.fetchBoardList();
}

export async function createBoard(board: IBoard): Promise<IBoard> {
  const api = new BoardAPI();
  return api.createBoard(board);
}

export async function updateBoard(boardId: number, updatedBoard: IBoard): Promise<IBoard> {
  const api = new BoardAPI();
  return api.updateBoard(boardId, updatedBoard);
}

export async function deleteBoard(boardId: number): Promise<void> {
  const api = new BoardAPI();
  await api.deleteBoard(boardId);
}

export async function createCard(boardId: number, card: ICard): Promise<ICard> {
  const api = new BoardAPI();
  return api.createCard(boardId, card); // Verifique se os dados do cartão estão corretos
}

export async function updateCard(boardId: number, cardId: number, card: ICard): Promise<ICard> {
  const api = new BoardAPI();
  return api.updateCard(boardId, cardId, card);
}

export async function deleteCard(boardId: number, cardId: number): Promise<void> {
  const api = new BoardAPI();
  await api.deleteCard(boardId, cardId);
}
