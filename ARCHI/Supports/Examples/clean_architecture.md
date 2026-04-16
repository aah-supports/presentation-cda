# Exemple de code clean Architecture 

### Retour au cours clean architecture 🌀

[cours 🌀](../../02_CONCEPTS_ARCHI/Supports/Chapitre_introduction.md)

### **Structure du projet suivant la clean architecture :**


```markdown
+-----------------------------------+
|          Infrastructure           |  <-- Couches externes (Frameworks, DB)
|  (Express, Database, etc.)        |
+-----------------------------------+
            |
            | (Adaptateurs implémentant des ports)
            v
+-----------------------------------+
|            Adaptateurs            |  <-- Relient le domaine aux interfaces externes
| (API, Controllers, Repositories)  |
+-----------------------------------+
            |
            | (Appels via les ports)
            v
+-----------------------------------+
|         Logiciel Métier (Domaine) |  <-- Contient la logique métier
| (Entities, UseCases, Ports)       |
+-----------------------------------+
```

## Arborescence d'un projet avec la clean Architecture


```
├── adapters
│   ├── api
│   │   ├── main.ts             // Point d'entrée pour démarrer le serveur Express
│   │   └── userRouter.ts       // Définit les routes API liées à l'utilisateur (GET, POST, etc.)
│   ├── controllers
│   │   └── UserController.ts   // Gère la logique des requêtes HTTP pour l'utilisateur, interagit avec les cas d'utilisation
│   └── database
│       └── UserRepositoryImpl.ts  // Implémentation du dépôt d'utilisateurs, simule l'accès à la base de données (ici avec un tableau)
├── app.ts                      // Point d'entrée principal de l'application, configure et lance le serveur après connexion à la DB
├── config
│   └── default.ts              // Contient la configuration par défaut, comme l'URL de la base de données et le port du serveur
├── domain
│   ├── entities
│   │   └── User.ts             // Définition de l'entité "User", qui contient les propriétés et méthodes de l'utilisateur
│   ├── interfaces
│   │   └── UserRepository.ts   // Interface du dépôt d'utilisateurs, définit les méthodes à implémenter pour l'accès aux utilisateurs
│   ├── services
│   │   └── UserService.ts      // Contient la logique métier spécifique à l'utilisateur, par exemple la validation ou le calcul de l'âge
│   └── usecases
│       └── GetUserUseCase.ts  // Cas d'utilisation pour récupérer un utilisateur spécifique ou une liste d'utilisateurs
├── infrastructure
│   ├── database
│   │   └── dbConnection.ts     // Gère la connexion à la base de données, même si ici c'est simulé
│   └── frameworks
│       └── ExpressApp.ts       // Configure et initialise le serveur Express
└── types
    ├── Config.ts              // Définit les types pour la configuration (par exemple, les paramètres du serveur et de la DB)
    └── UserAdulte.ts          // Type pour associer une propriété supplémentaire "adulte" à l'entité User
app.ts                         // Point d'entrée de l'application
.env                           // variable d'environnement
```

---



### **Domain :**

#### **1. Entité : `User.ts`**
```ts
export class User {
    constructor(
      private _id: string,
      private _name: string,
      private _email: string,
      private _age: number
    ) {}
  
    // Getters
    // Setters
  }
  
```

#### **2. Interface : `UserRepository.ts`**
```ts
import { User } from "../entities/User";

export interface UserRepository {
  findById(id: string): User | null;
  save(user: User): void;
  getAll(): User[];
}

```

#### **3. Services: `UserService.ts`**

```ts
export class UserService {
  // Méthode pour valider un email
  static validateEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }

  // Méthode pour vérifier si un utilisateur est majeur
  static isAdult(age: number): boolean {
    return age >= 18;
  }
}
```

#### **3. Cas d’utilisation : `CreateUserUseCase.ts`**
```ts
import { UserRepository } from "../interfaces/UserRepository";
import { User } from "../entities/User";

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  execute(id: string): User | null {
    return this.userRepository.findById(id);
  }
}
```

### **Adaptateurs: ** 

#### **4. datatabase : `UserRepositoryImpl.ts`**
```ts
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/UserRepository";

export class UserRepositoryImpl implements UserRepository {
  private users: User[] = [
    new User("1", "Alice", "alice@example.com", 25),
    new User("2", "Bob", "bob@example.com", 30)
  ];

  findById(id: string): User | null {
    return this.users.find(user => user.id === id) || null;
  }

  save(user: User): void {
    this.users.push(user);
  }

  getAll(): User[] {
    return this.users;
  }
}
```

#### **5. Contrôleur : `UserController.ts` **
```ts
import { Request, Response } from "express";
import { GetUserUseCase } from "../../domain/usecases/GetUserUseCase";
import { UserRepositoryImpl } from "../database/UserRepositoryImpl";
import { UserService } from "../../domain/services/UserService";
import { UserWithAdulte } from "../../types/UserAdulte";

const userRepository = new UserRepositoryImpl();
const getUserUseCase = new GetUserUseCase(userRepository);

export const UserController = {
    getUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = getUserUseCase.execute(id);
            if (user) {
                // service 
                UserService.isAdult(user.age)
                res.status(200).json({
                    ...user,
                    adulte: UserService.isAdult(user.age)
                });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },
    getAllUsers: (req: Request, res: Response) => {
        try {
            const users = userRepository.getAll();
            const usersAdultes = []
            
            for (const user of users) {
                const UserWA = { ...user, adulte : UserService.isAdult(user.age)}
                usersAdultes.push(UserWA)
            }

            res.json(usersAdultes);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
};
```

#### **6. api : `userRouter.ts` et `main.ts`**
```ts
// userRouter
import express from "express";
import { UserController } from "../controllers/UserController";

const userRouter = express.Router();

userRouter.get("/users", UserController.getAllUsers);
userRouter.get("/user/:id", UserController.getUser);

export default userRouter;

// main.ts
import express from "express";
import userRouter from "./userRouter";

const app = express();

app.use(express.json());
app.use("/api", userRouter); // préfix les routes

export default app;
```

...

### Infrastructure 

#### **7. database : `dbConnection.ts` **

```js
export const connectToDatabase = () => {
    console.log("Fake database connected");
  };
```

#### **8. frameworks : `ExpressApp.ts` **

```js
import express, { Request, Response, NextFunction } from "express";
import main from "../../adapters/api/main";  // Exemple d'un routeur d'API

const app = express();

// Middlewares
app.use(express.json());
app.use("/", main);  // Exemple de route

// Middleware pour gérer les erreurs 404
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Page not found" });
});

// Optionnel : Middleware pour gérer les erreurs internes
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
```

#### **9. Fichier principal : `app.ts`**

Point d'entrée de l'application

```ts
import server from "./infrastructure/frameworks/ExpressApp";
import { connectToDatabase } from "./infrastructure/database/dbConnection";
import { config } from "./config/default";

const { server: { port: PORT } } = config;

connectToDatabase();

try {

// Démarrer le serveur HTTP
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
} catch (error) {
console.error("Failed to connect to the database:", error);
}

```

---

### **Fonctionnement :**
1. Les entités (`User`) définissent la structure des données et contiennent des règles métier.
2. Les cas d'utilisation (`CreateUserUseCase`) orchestrent la logique métier en manipulant les entités et les dépôts.
3. Les adaptateurs (comme `UserRepositoryImpl` et `UserController`) permettent au cœur de l'application d'interagir avec des systèmes externes (comme une base de données ou une API).
4. Le serveur Express est configuré pour exposer une API minimaliste.

### **Exemple d’appel API :**
- **Méthode :** `POST`
- **Endpoint :** `http://localhost:3000/users`
- **Body :** 
```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com"
}
```

### Retour au cours clean architecture 🌀

[cours 🌀](../../02_CONCEPTS_ARCHI/Supports/Chapitre_introduction.md)


