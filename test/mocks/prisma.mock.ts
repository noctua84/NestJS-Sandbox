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

export const createMockPrismaClientKnownRequestError = (code: string) => {
    return new PrismaClientKnownRequestError('Test message', {
        code: code,
        clientVersion: '5.0.0',
    });
};
