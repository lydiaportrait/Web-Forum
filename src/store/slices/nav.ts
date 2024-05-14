import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IUser {
  id: number;
  isAdmin: boolean;
  name: string;
  description: string;
  dateCreated: string;
}

export interface IBoard {
  id: number;
  owner: IUser;
  name: string;
  description: string;
  conversations: number[];
}

export interface IConversation {
  id: number;
  owner: IUser;
  name: string;
  description: string;
  dateCreated: string;
}

export interface IPost {
  id: number;
  owner: IUser;
  content: string;
}

export interface INavState {
  currentBoard?: IBoard | null;
  currentConversation?: IConversation | null;
  isRegistering?: boolean;
  newBoardToggle?: boolean;
  newConvoToggle?: boolean;
}

export const navSlice = createSlice({
  name: 'nav',
  initialState: {
    isRegistering: false,
    newBoardToggle: false,
    newConvoToggle: false
  } as INavState,
  reducers: {
    changeBoard: (_, action: PayloadAction<IBoard>) => {
      return {
        currentBoard: action.payload
      };
    },
    resetBoard: (state) => {
      state.currentBoard = null;
    },
    changeConversation: (state, action: PayloadAction<IConversation>) => {
      state.currentConversation = action.payload;
    },
    resetConversation: (state) => {
      state.currentConversation = null;
    },
    setRegistering: (state, action: PayloadAction<boolean>) => {
      state.isRegistering = action.payload;
    },
    toggleNewBoard: (state) => {
      state.newBoardToggle = !state.newBoardToggle;
    },
    toggleNewConvo: (state) => {
      state.newConvoToggle = !state.newConvoToggle;
    }
  }
});

export const {
  changeBoard,
  resetBoard,
  changeConversation,
  resetConversation,
  setRegistering,
  toggleNewBoard,
  toggleNewConvo
} = navSlice.actions;
export default navSlice.reducer;
