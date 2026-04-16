# Comparaison clean et hexa

### Plan du cours général

[plan du cours](../../01_ORGA/00_plan.md)

### 1. Clean Architecture

Dans la Clean Architecture, nous allons organiser les fichiers en différentes couches : **Domain**, **UseCase**, et **Interface**.

<span style="color:pink">Dans la Clean Architecture, les couches ne fonctionnent s'exécutent successivement, comme des niveaux de responsabilité distincts qui interagissent les uns avec les autres selon des dépendances strictes orientées vers l'intérieur.</span>

#### Structure des fichiers :
```
/src
  /domain
    Account.ts
  /usecases
    CalculateBalance.ts
  /interfaces
    AccountRepository.ts
    AccountController.ts
```

#### Fichier : `domain/Account.ts`
```typescript
export class Account {
  private balance: number;

  constructor(balance: number) {
    this.balance = balance;
  }

  getBalance(): number {
    return this.balance;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
    } else {
      throw new Error('Insufficient funds');
    }
  }
}
```

#### Fichier : `usecases/CalculateBalance.ts`
```typescript
import { Account } from "../domain/Account";
import { AccountRepository } from "../interfaces/AccountRepository";

export class CalculateBalance {
  private accountRepo: AccountRepository;

  constructor(accountRepo: AccountRepository) {
    this.accountRepo = accountRepo;
  }

  execute(accountId: string): number {
    const account = this.accountRepo.findById(accountId);
    return account.getBalance();
  }
}
```

#### Fichier : `interfaces/AccountRepository.ts`
```typescript
import { Account } from "../domain/Account";

export interface AccountRepository {
  findById(accountId: string): Account;
}
```

#### Fichier : `interfaces/AccountController.ts`
```typescript
import { CalculateBalance } from "../usecases/CalculateBalance";

export class AccountController {
  private calculateBalance: CalculateBalance;

  constructor(calculateBalance: CalculateBalance) {
    this.calculateBalance = calculateBalance;
  }

  getBalance(accountId: string): void {
    const balance = this.calculateBalance.execute(accountId);
    console.log(`Account Balance: ${balance}`);
  }
}
```

### Explication de Clean Architecture :
- **Domain (Entities)** : La classe `Account` contient la logique métier (les règles de gestion des comptes).
- **UseCases** : La classe `CalculateBalance` exécute l'action de calcul du solde du compte en interagissant avec le repository.
- **Interfaces** : L'interface `AccountRepository` définit la méthode pour interagir avec la source de données (qui pourrait être une base de données dans un cas réel), et `AccountController` gère la logique d'interface utilisateur.

Les dépendances vont du contrôleur (le plus externe) vers l'intérieur de l'application.

---

### 2. Architecture Hexagonale (Ports and Adapters)

L'architecture hexagonale est plus centrée sur les **ports** et les **adaptateurs**. On va utiliser les **ports** pour les interactions (ici le calcul du solde) et les **adaptateurs** pour les implémentations concrètes de ces interactions.

#### Structure des fichiers :
```
/src
  /core
    Account.ts
    AccountService.ts
  /adapters
    InMemoryAccountRepository.ts
    AccountController.ts
```

#### Fichier : `core/Account.ts`
```typescript
export class Account {
  private balance: number;

  constructor(balance: number) {
    this.balance = balance;
  }

  getBalance(): number {
    return this.balance;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
    } else {
      throw new Error('Insufficient funds');
    }
  }
}
```

#### Fichier : `core/AccountService.ts`
```typescript
import { Account } from "./Account";

export class AccountService {
  calculateBalance(account: Account): number {
    return account.getBalance();
  }
}
```

#### Fichier : `adapters/InMemoryAccountRepository.ts`
```typescript
import { Account } from "../core/Account";
import { AccountService } from "../core/AccountService";

export class InMemoryAccountRepository {
  private accounts: Account[] = [];

  save(account: Account): void {
    this.accounts.push(account);
  }

  findById(accountId: string): Account {
    return this.accounts.find(acc => acc.id === accountId);
  }
}
```

#### Fichier : `adapters/AccountController.ts`
```typescript
import { AccountService } from "../core/AccountService";
import { InMemoryAccountRepository } from "./InMemoryAccountRepository";

export class AccountController {
  private accountService: AccountService;
  private repository: InMemoryAccountRepository;

  constructor() {
    this.accountService = new AccountService();
    this.repository = new InMemoryAccountRepository();
  }

  getBalance(accountId: string): void {
    const account = this.repository.findById(accountId);
    const balance = this.accountService.calculateBalance(account);
    console.log(`Account Balance: ${balance}`);
  }
}
```

### Explication de l'architecture hexagonale :
- **Core** : Le domaine central de l'application (`Account`, `AccountService`) contient toute la logique métier.
- **Ports** : Ici, les ports sont les interfaces `AccountService` (calculer le solde) et `AccountRepository` (retrouver un compte). Le port pour l'interaction avec le monde extérieur est encapsulé dans un service (`AccountService`).
- **Adaptateurs** : Ce sont les implémentations concrètes des ports, comme `InMemoryAccountRepository` pour la gestion en mémoire des comptes et `AccountController` pour l'interface utilisateur.

Les adaptateurs permettent de connecter l'application aux différents environnements externes (UI, API, stockage).

---

### Comparaison :
- **Clean Architecture** : La logique métier est bien séparée, mais on a plusieurs couches distinctes (UseCases, Interfaces, etc.), avec des dépendances contrôlées.
- **Hexagonale** : Elle se concentre davantage sur les interactions externes via les ports et les adaptateurs, facilitant l'intégration avec des systèmes externes et rendant les tests plus simples.

### Plan du cours général

[plan du cours](../../01_ORGA/00_plan.md)