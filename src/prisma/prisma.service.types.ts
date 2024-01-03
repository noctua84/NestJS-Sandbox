export interface PagingArgs {
    skip?: number;
    take?: number;
    cursor?: {
        id?: number;
    };
}
