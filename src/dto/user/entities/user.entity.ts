import { ApiProperty } from '@nestjs/swagger';

export class User {
    @ApiProperty({
        type: 'integer',
        format: 'int32',
    })
    id: number;
    @ApiProperty()
    email: string;
}
