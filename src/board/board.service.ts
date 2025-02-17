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
            title,
            description: description, // 동일하면 스킵가능
            status: BoardStatus.PUBLIC,
        }

        this.boards.push(board);
        return board;
    }

}
