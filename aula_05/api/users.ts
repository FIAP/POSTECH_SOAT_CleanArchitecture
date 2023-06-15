class UsersAPI { 
    public listUser(): string {
        // 1. a API está no mesmo nível que o banco de dados, então pode acessar
        const userRepository = new MySqlUserRepository();
        // 2. Criamos o UserController INJETANDO o userRepository. 
        // O MySqlUserRepository implementa a interface 
        const userController = new UserController(userRepository);
        // 3. userController consegue usar o repositorio sem se importar
        // como ele funciona. Por isso consegue obter os dados, validar e 
        // retornar.         
        const all_users = userController.getUsers();
        return JSON.stringify(all_users);
    }
}

class UserController implements IUserController { 
    repository: IUserRepository;
    
    constructor(userRepository: IUserRepository) {
        this.repository = userRepository
    }
    public getUsers(): any[][] {  
        const all_users = this.repository.returnAllUsers();
        // validar os dados usando os usecases e Entities
        // criados com os dados que vem do repositorio.

        // adaptar e retornar os dados. 
    } ;
}

interface IUserRepository {
  returnAllUsers(): any[][]; 
}

interface IUserController { }

class MySqlUserRepository implements IUserRepository { 
    // ... 

    public returnAllUsers(): any[][] {
        // busca no banco de dados
    }
}