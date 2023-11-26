import { INestApplication } from '@nestjs/common';

const mockHttpAdapter = {
    get: jest.fn(),
    put: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
};

export const createMockApp = (): Partial<INestApplication> => ({
    listen: jest.fn(),
    get: jest.fn().mockReturnValue({ httpAdapter: mockHttpAdapter }),
    useGlobalFilters: jest.fn(),
});
