import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    findAll(): Promise<Movie[]>;
    findOne(id: string): Promise<Movie>;
    update(id: string, movie: Partial<Movie>): Promise<Movie>;
    delete(id: string): Promise<void>;
    create(movie: Movie): void;
}
