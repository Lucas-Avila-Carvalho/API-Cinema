import { Movie } from './movie.entity';
import { DbService } from '../db/db.service';
export declare class MoviesService {
    private readonly dbService;
    constructor(dbService: DbService);
    findAll(): Promise<Movie[]>;
    findByTitle(title: string): Promise<Movie | null>;
    create(movie: Movie): Promise<Movie>;
    findOne(id: string): Promise<Movie>;
    update(id: string, movie: Partial<Movie>): Promise<Movie>;
    delete(id: string): Promise<void>;
}
