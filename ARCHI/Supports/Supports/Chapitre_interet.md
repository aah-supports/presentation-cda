### 1. **Pourquoi la Clean Architecture ?**

### Plan du cours général

[plan du cours](../../01_ORGA/00_plan.md)

**Objectif principal :**  
- Rendre le code **maintenable** et **évolutif**.
- **Séparer les préoccupations** : distinguer la logique métier des aspects techniques comme la base de données, l'interface utilisateur ou les frameworks.
- Garantir que les **cas d'utilisation** restent au cœur du projet, indépendants des détails externes.  

**Problèmes qu'elle résout :**  
- Difficulté à modifier le code à cause des dépendances fortes.  
- Manque de testabilité.  
- Couplage excessif entre les couches métier et techniques.

---

### 2. **Principes fondamentaux de la Clean Architecture**
- **Couches concentriques :**
  - **Entités** : La couche centrale. Contient les objets métier fondamentaux.
  - **Cas d'utilisation** : Décrit ce que l'application doit faire en termes de règles métier.
  - **Interface utilisateur et adaptateurs** : Connectent les utilisateurs ou les systèmes externes à l'application.
  - **Frameworks** : Couches externes fournissant des outils, bases de données ou services tiers.

- **Règle de dépendance :**
  Les dépendances doivent toujours aller **vers l'intérieur** (vers les couches métier). Les couches externes (comme la base de données ou le framework web) dépendent des couches internes, jamais l'inverse.

---

### 3. **Exemple concret d'intérêt**
**Cas pratique :** Développement d'une application bancaire.  
Si les règles métier changent (exemple : nouvelle réglementation), on peut modifier les cas d'utilisation sans impacter la base de données ou l'interface utilisateur.

---

### 4. **Exemple de code minimaliste**

#### Fichier 1 : **UseCase (Cas d'utilisation)**
```ts
export class TransferFunds {
  constructor(private readonly accountRepository: AccountRepository) {}

  execute(fromAccountId: string, toAccountId: string, amount: number): void {
    const fromAccount = this.accountRepository.findById(fromAccountId);
    const toAccount = this.accountRepository.findById(toAccountId);

    fromAccount.debit(amount);
    toAccount.credit(amount);

    this.accountRepository.save(fromAccount);
    this.accountRepository.save(toAccount);
  }
}
```

#### Fichier 2 : **Infrastructure**
```typescript
export class AccountRepositoryInMemory implements AccountRepository {
  private accounts: Map<string, Account> = new Map();

  findById(accountId: string): Account {
    return this.accounts.get(accountId)!;
  }

  save(account: Account): void {
    this.accounts.set(account.id, account);
  }
}
```

---

### 5. **Exercice pour les étudiants**
- Développer une mini-application en suivant la Clean Architecture pour :
  1. Gérer une liste de tâches.
  2. Séparer les cas d'utilisation (ajouter une tâche, marquer comme terminée) de l'interface utilisateur et de la base de données.

---

### 6. **Illustration de l'architecture**
Affichez un diagramme montrant les couches concentriques et les dépendances pour mieux visualiser le concept.

---

### 7. **Discussion : l'intérêt pédagogique**
- **Testabilité accrue** : Les cas d'utilisation peuvent être testés sans dépendre d'une base de données ou d'un framework.
- **Évolutivité** : Ajout d'une nouvelle interface utilisateur ou migration de base de données sans toucher aux couches internes.
- **Lisibilité** : Une séparation claire des responsabilités facilite la compréhension du code.

### Plan du cours général

[plan du cours](../../01_ORGA/00_plan.md)