interface Transaction { }

interface DBConnection {
    sendQuery(query: string, params: any[], transaction: Transaction|null): any[];
    sendCommand(command: string, params: any[]): boolean;
    startTransaction(): Transaction;
    commitTransaction(t: Transaction): void;
    rollbackTransaction(t: Transaction): void;
}