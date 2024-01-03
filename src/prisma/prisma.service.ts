import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PagingArgs } from './prisma.service.types';

@Injectable()
export class PrismaService implements OnApplicationShutdown {
    private readonly client: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.client = prismaClient;
    }

    /**
     * Disconnects the Prisma client when the application is shutting down.
     * @returns A Promise that resolves when the disconnection is complete.
     */
    async onApplicationShutdown(): Promise<void> {
        try {
            await this.client.$disconnect();
        } catch (error: any) {
            console.error(
                `Error disconnecting from Prisma Client: ${error.message}`,
            );
        }
    }

    /**
     * Returns an instance of the PrismaClient class.
     *
     * @returns {PrismaClient} An instance of the PrismaClient class.
     */
    getPrismaClient(): PrismaClient {
        return this.client;
    }

    addPaging(start?: number, pageSize?: number): PagingArgs {
        const pagingType: string = process.env.PAGING_TYPE || 'offset';

        if (start && pageSize) {
            if (pagingType === 'cursor') {
                return {
                    cursor: {
                        id: start,
                    },
                    take: pageSize,
                };
            }

            return {
                skip: (start - 1) * pageSize,
                take: pageSize,
            };
        } else {
            return {};
        }
    }
}
