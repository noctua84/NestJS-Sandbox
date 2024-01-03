import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({
        type: 'integer',
        format: 'int32',
    })
    id: number;
    @ApiProperty()
    email: string;
}
