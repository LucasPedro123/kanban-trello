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
  updateBoard,
} from "../Helper/APILayers"; // Removido 'updateBoard'

function Dashboard() {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [targetCard, setTargetCard] = useState<{ boardId: number; cardId: number } | null>(null);

  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  useEffect(() => {
    const fetchData = async () => {
      try {
        const boardList = await fetchBoardList();
        setBoards(boardList);
      } catch (error) {
        console.error("Erro ao carregar quadros:", error);
      } finally {
        setLoading(false); // Marca o carregamento como concluído, independentemente do resultado
      }
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
    // Este é o ID do quadro do qual o cartão foi arrastado
    const sourceBoardId = boardId;
    // Este é o ID do quadro para o qual o cartão foi arrastado
    const targetBoardId = targetCard?.boardId; // `targetCard` precisa ser definida no estado
  
    if (!targetBoardId) return; // Se não houver quadro de destino, saia da função
  
    // Encontrar o índice do quadro de origem e de destino
    const sourceBoardIndex = boards.findIndex((item) => item._id === sourceBoardId);
    const targetBoardIndex = boards.findIndex((item) => item._id === targetBoardId);
  
    if (sourceBoardIndex < 0 || targetBoardIndex < 0) return; // Se não encontrou os quadros, sai
  
    // Encontrar o índice do cartão no quadro de origem
    const sourceCardIndex = boards[sourceBoardIndex]?.cards?.findIndex(
      (item) => item._id === cardId,
    );
  
    if (sourceCardIndex < 0) return; // Se não encontrou o cartão, sai
  
    // Atualizar localmente para remover o cartão do quadro de origem
    const updatedBoards = [...boards];
    const [card] = updatedBoards[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
  
    // Adiciona o cartão ao quadro de destino
    updatedBoards[targetBoardIndex].cards.push(card);
  
    // Atualiza o estado do componente
    setBoards(updatedBoards);
  
    // Enviar atualizações para o back-end
    const updateBoardData = async () => {
      await updateBoard(sourceBoardId, updatedBoards[sourceBoardIndex]); // Atualiza o quadro de origem
      await updateBoard(targetBoardId, updatedBoards[targetBoardIndex]); // Atualiza o quadro de destino
    };
  
    updateBoardData(); // Chama a função para enviar atualizações para o back-end
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
        {loading ? ( // Exibe o spinner enquanto carrega
          <div className="spinner">
            <div role="status" >
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#8ab36b]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}


export default Dashboard;
