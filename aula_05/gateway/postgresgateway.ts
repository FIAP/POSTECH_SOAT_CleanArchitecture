import { Client, ResultRow } from 'ts-postgres';

class PostgresGateway {
    private dsn: string;
    private client: Client;

    constructor(dsn: string) {
        this.dsn = dsn; 
        const client = new Client();
    }

    public async getClientsById(clientId: string): Promise<ResultRow | null> {
        const sqlQuery = "SELECT id, name, status FROM clients WHERE id = $1";
        await this.client.connect();

        let clientData: ResultRow | null = null; 

        try { 

            const result = await this.client.query(sqlQuery, [clientId,]);
            const rows = [...result];
            if (rows.length > 0) {
                clientData = rows[0];
            }
        }
        finally { 
            this.client.end();
        }

        return clientData;
    }
}