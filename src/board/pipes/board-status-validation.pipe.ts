import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board.model";

export class BoardStatusValidationPipe implements PipeTransform {

    readonly StatusOption = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]

    transform(value: any) {
        value = value.toUpperCase();

        if ( !this.isStatusValid(value) ) {
            throw new Error(`${value} is an invalid status`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        const index = this.StatusOption.indexOf(status);
        return index !== -1;
    }
}