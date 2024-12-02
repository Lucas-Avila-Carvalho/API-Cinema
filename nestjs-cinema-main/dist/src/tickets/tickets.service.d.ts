import { Ticket } from './ticket.entity';
import { DbService } from '../db/db.service';
export declare class TicketsService {
    private readonly dbService;
    constructor(dbService: DbService);
    create(ticket: Ticket): Promise<Ticket>;
    findAll(): Promise<Ticket[]>;
    findOne(id: string): Promise<Ticket>;
    update(id: string, ticket: Ticket): Promise<Ticket>;
    remove(id: string): Promise<void>;
}
