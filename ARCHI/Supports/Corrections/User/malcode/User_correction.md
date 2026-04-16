### Code mal conçu (code spaghetti)

Ce code mélange directement la logique métier, les dépendances techniques (comme la base de données) et le framework utilisé.

#### Code initial (Node.js avec Express) :
```ts
import express from 'express';

const app = express();
app.use(express.json());

const users = [
    { name: 'Alice', email: 'alice@example.com' }
];

// Route pour récupérer les utilisateurs
app.get('/users', (req, res) => {
    res.status(200).json(users);
});

// Route pour ajouter un utilisateur
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).send({ error: 'Name and email are required' });
    }

    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).send({ error: 'User already exists' });
    }

    users.push({ name, email });
    res.status(201).send({ message: 'User added successfully' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

#### Problèmes :
1. **Couplage fort** : La logique métier (validation, vérification des doublons) est directement imbriquée dans le contrôleur.
2. **Dépendance directe aux données** : Impossible de changer facilement la base de données.
3. **Difficile à tester** : Les tests nécessitent une base de données fonctionnelle, ici ce n'est pas exact car les données ne sont pas dans une base de données mais dans un tableau.
4. **Pas de séparation des préoccupations** : Tout est mélangé.

---

### Étape 2 : Refactorisation en Clean Architecture

Nous allons structurer le code en suivant les couches de la Clean Architecture : **Entités**, **Cas d’utilisation**, **Interfaces**, et **Adapteurs**.

#### 1. **Entité** :
Une classe représentant un utilisateur avec sa logique propre.
```ts
export class User {
    constructor(public name: string, public email: string) {}

    validate() {
        if (!this.name || !this.email) {
            throw new Error('Name and email are required');
        }
    }
}
```

#### 2. **Cas d’utilisation** :
Contient la logique métier pour ajouter un utilisateur.
```ts
export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) {}

     execute(name: string, email: string) {
        const user = new User(name, email);
        user.validate();

        const existingUser = this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        this.userRepository.save(user);
    }
}
```

#### 3. **Interface du repository** :
Permet d’abstraire la logique de persistance.
```ts
export interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    save(user: User): Promise<void>;
}
```

#### 4. **Adapteur pour la base de données** :
Implémente le repository 
```ts
import { IUserRepository } from '../core/IUserRepository';
import { User } from '../core/User';
import { users } from './Data.users.js';

export class UserRepository implements IUserRepository {
    private db: User[];

    constructor(, private dbName: string) {}

     connect() {
        // connexion à la base de
    }

     findByEmail(email: string):User {
        const result = users.findOne({ email });
        return result ? new User(result.name, result.email) : null;
    }

     save(user: User) : void {
       users.push(user)
    }
}
```

#### 5. **Contrôleur** :
Orchestre les cas d’utilisation et les adapteurs.
```ts
import express from 'express';
import { CreateUserUseCase } from '../core/CreateUserUseCase';
import { UserRepository } from '../adapters/UserRepository';

const app = express();
app.use(express.json());

const useCase = new CreateUserUseCase();

app.post('/users',  (req, res) => {
    try {
        const { name, email } = req.body;
        useCase.execute(name, email);
        res.status(201).send({ message: 'User created' });
    } catch (err: any) {
        res.status(400).send({ error: err.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

### Résultats du refactor :
1. **Séparation des préoccupations** :
   - La validation est dans l’entité.
   - La logique métier est dans le cas d’utilisation.
   - Le contrôleur n’est qu’un intermédiaire.
2. **Testabilité** :
   - On peut tester la logique métier indépendamment en mockant le repository.
3. **Facilité de changement** :
   - Pour changer MongoDB, il suffit de remplacer l’adapteur.
4. **Lisibilité accrue** :
   - Chaque couche a une responsabilité claire.

---

