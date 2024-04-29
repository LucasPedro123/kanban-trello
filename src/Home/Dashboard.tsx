import React, { useEffect, useState } from "react";
import Board from "../Components/Board/Board";
import "./Dashboard.css";
import CustomInput from "../Components/CustomInput/CustomInput";
import { ICard, IBoard } from "../Interfaces/Kanban";
import {
  fetchBoardList,
  createBoard,
  deleteBoard,
  createCard,
  updateCard,
  deleteCard,
} from "../Helper/APILayers"; // Removido 'updateBoard'

function Dashboard() {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [targetCard, setTargetCard] = useState<{ boardId: number; cardId: number } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const boardList = await fetchBoardList();
      console.log("Boards carregados:", boardList); // Verifique se os quadros foram carregados corretamente
      setBoards(boardList);
    };

    fetchData();
  }, []);

  async function fetchData() {
    const boardList = await fetchBoardList();
    setBoards(boardList);
  }

  const addBoardHandler = async (name: string) => {
    const newBoard: IBoard = {
      _id: Date.now(),
      title: name,
      cards: [],
    };

    const createdBoard = await createBoard(newBoard);
    setBoards([...boards, createdBoard]);
  };

  const removeBoard = async (boardId: number) => {
    await deleteBoard(boardId);

    const updatedBoards = boards.filter((board) => board._id !== boardId);
    setBoards(updatedBoards);
  };

    useEffect(() => {
    const fetchData = async () => {
      const boardList = await fetchBoardList();
      setBoards(boardList);
    };

    fetchData();
  }, []);

  const addCardHandler = async (boardId: number, title: string) => {
    console.log("Board ID ao adicionar cartão:", boardId); // Verifica se o boardId está correto
  
    const newCard: ICard = {
      _id: Date.now(), // Este ID é usado internamente, mas não deve ser confundido com ObjectId
      title,
      labels: [],
      date: "",
      tasks: [],
      desc: "",
    };
  
    await createCard(boardId, newCard); // Passe o boardId correto
  };

  const removeCard = async (boardId: number, cardId: number) => {
    await deleteCard(boardId, cardId);

    const updatedBoards = boards.map((board) => {
      if (board._id === boardId) {
        return {
          ...board,
          cards: board.cards.filter((card) => card._id !== cardId),
        };
      }
      return board;
    });

    setBoards(updatedBoards);
  };

  const updateCardHandler = async (boardId: number, cardId: number, updatedCard: ICard) => {
    const updatedBoards = boards.map((board) => {
      if (board._id === boardId) {
        return {
          ...board,
          cards: board.cards.map((card) =>
            card._id === cardId ? updatedCard : card
          ),
        };
      }
      return board;
    });

    await updateCard(boardId, cardId, updatedCard); // Agora com 3 argumentos
    setBoards(updatedBoards);
  };

  const onDragEnd = (boardId: number, cardId: number) => {
    if (!targetCard) return;

    const sourceBoardIndex = boards.findIndex((item) => item._id === boardId);
    if (sourceBoardIndex < 0) return;

    const sourceCardIndex = boards[sourceBoardIndex]?.cards?.findIndex(
      (item) => item._id === cardId,
    );
    if (sourceCardIndex < 0) return;

    const targetBoardIndex = boards.findIndex(
      (item) => item._id === targetCard.boardId,
    );
    if (targetBoardIndex < 0) return;

    const targetCardIndex = boards[targetBoardIndex]?.cards?.findIndex(
      (item) => item._id === targetCard.cardId,
    );
    if (targetCardIndex < 0) return;

    const tempBoardsList = [...boards];
    const sourceCard = tempBoardsList[sourceBoardIndex].cards[sourceCardIndex];
    tempBoardsList[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
    tempBoardsList[targetBoardIndex].cards.splice(
      targetCardIndex,
      0,
      sourceCard,
    );

    setBoards(tempBoardsList);

    setTargetCard(null);
  };

  const onDragEnter = (boardId: number, cardId: number) => {
    if (targetCard && targetCard.cardId === cardId) return;

    setTargetCard({
      boardId,
      cardId,
    });
  };

  return (
    <div className="app">
      <div className="app-nav">
        <h1>Sistema de Produção em Kanban</h1>
      </div>
      <div className="app-boards-container">
        <div className="app-boards">
          {boards.map((item) => (
            <Board
              key={item._id}
              board={item}
              addCard={addCardHandler}
              removeBoard={() => removeBoard(item._id)}
              removeCard={removeCard}
              onDragEnd={onDragEnd}
              onDragEnter={onDragEnter}
              updateCard={updateCardHandler}
            />
          ))}
          <div className="app-boards-last">
            <CustomInput
              displayClass="app-boards-add-board"
              editClass="app-boards-add-board-edit"
              placeholder="Insira o Nome do Quadro"
              text="Adicionar Quadro"
              buttonText="Adicionar Quadro"
              onSubmit={addBoardHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
