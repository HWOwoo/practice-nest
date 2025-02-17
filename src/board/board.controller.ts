import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('board')
export class BoardController {
    constructor(private boardService: BoardService) {}

    @Get('/')
    getAllBoards(): Board[] {    
        return this.boardService.getAllBoards();
    }

    @Post('/')
    createBoard(
        @Body() createBoardDto: CreateBoardDto
    ) : Board{
        return this.boardService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string) {
        return this.boardService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id : string) : void {
        this.boardService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(@Param('id') id: string, @Body('status', BoardStatusValidationPipe) status: BoardStatus) : Board {
        return this.boardService.updateBoardStatus(id, status);
    }

}
