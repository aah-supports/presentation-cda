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
2. **Dépendance directe avec les données** : Impossible de changer facilement le lien avec les données
3. **Difficile à tester**.
4. **Pas de séparation des préoccupations** : Tout est mélangé.

---

### Étape 2 : Refactorisation en Clean Architecture

Structurez le code en suivant les couches de la Clean Architecture : **Entités**, **Cas d’utilisation**, **Interfaces**, et **Adapteurs** et **Controller**


