import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
    private boards: Board[] = [];

    getAllBoards() {
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto) {
        const { title,description } = createBoardDto;
        const board:Board = {
            id: uuid(),
            title, // 이름이 동일하면 스킵가능
            description: description, 
            status: BoardStatus.PUBLIC,
        }

        this.boards.push(board);
        return board;
    }

    getBoardById(id: string) : Board | undefined {
        return this.boards.find((borad) => borad.id === id);
    }

    deleteBoard(id: string) : void {
        this.boards = this.boards.filter((board) => board.id !== id);
    }
    
    updateBoardStatus(id: string, status: BoardStatus) : Board {
        const board = this.getBoardById(id);

        if (!board) {
            throw new Error(`Board with id ${id} not found`);
        }
        
        board.status = status;

        return board;
    }
}
