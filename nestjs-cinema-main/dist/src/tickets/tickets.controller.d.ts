import { TicketsService } from './tickets.service';
import { Ticket } from './ticket.entity';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    create(ticket: Ticket): Promise<Ticket>;
    findAll(): Promise<Ticket[]>;
    findOne(id: string): Promise<Ticket>;
    update(id: string, ticket: Ticket): Promise<Ticket>;
    remove(id: string): Promise<void>;
}
