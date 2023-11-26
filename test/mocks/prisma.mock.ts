import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export type Context = {
    prisma: PrismaClient;
};

export type MockContext = {
    prisma: DeepMockProxy<PrismaClient>;
};

export const createMockContext = (): MockContext => {
    return {
        prisma: mockDeep<PrismaClient>(),
    };
};

export const createMockHost = () => {
    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        isHeaderSent: jest.fn(),
    };

    return {
        switchToHttp: jest.fn().mockReturnThis(),
        getResponse: jest.fn().mockReturnValue(mockResponse),
        getRequest: jest.fn(),
        getArgs: jest.fn(),
        getArgByIndex: jest.fn(),
        getArgsByIndex: jest.fn(),
        getType: jest.fn(),
        switchToRpc: jest.fn(),
        switchToWs: jest.fn(),
        getRpcContext: jest.fn(),
        getRpcParams: jest.fn(),
        getHandler: jest.fn(),
        getClass: jest.fn(),
        getHandlerMethodName: jest.fn(),
        getNext: jest.fn(),
    };
};

export const createMockPrismaClientKnownRequestError = (code: string) => {
    return new PrismaClientKnownRequestError('Test message', {
        code: code,
        clientVersion: '5.0.0',
    });
};
