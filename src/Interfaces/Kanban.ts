export interface ILabel {
  color: string;
  text: string;
}

export interface ITask {
  id: number;
  text: string;
  completed: boolean;
}

export interface ICard {
  _id: number;
  title: string;
  desc?: string;
  date?: string;
  labels: ILabel[];
  tasks: ITask[];
}

export interface IBoard {
  _id: number;
  title: string;
  cards: ICard[];
}