import { OnModuleInit } from '@nestjs/common';
export declare class DbService implements OnModuleInit {
    private movies;
    private tickets;
    onModuleInit(): void;
    getMovieDatastore(): Datastore;
    getTicketDatastore(): Datastore;
}
