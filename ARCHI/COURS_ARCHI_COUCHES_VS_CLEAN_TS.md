# Cours: Architecture en couches vs Clean Architecture (TypeScript)

## Objectif
Comprendre les différences entre architecture en couches, architecture héxagonale, et Clean Architecture.
Puis appliquer ces idées avec un exemple `TypeScript` autour d'un panier.

## Tableau comparatif

| **Architecture** | **Description** | **Exemple TypeScript** | **Avantages** | **Inconvenients** |
|---|---|---|---|---|
| **En couches** | Separe l'app en couches horizontales: presentation, metier, acces donnees. | `CartController -> CartService -> CartRepositoryMySQL` | Simple a lire, rapide a demarrer, bon pour CRUD. | Risque de couplage fort a la DB/framework si la couche metier absorbe tout. |
| **Hexagonale (Ports/Adapters)** | Centre l'app autour du metier; les entrees/sorties passent par des ports et adaptateurs. | `AddItemToCart` utilise `CartRepository` (port), implemente par `MySqlCartRepository` (adaptateur). | Forte testabilite, remplacement facile de techno (DB/API/UI). | Plus de structure au debut, cout de conception plus eleve. |
| **Clean Architecture** | Variante plus complete avec regle stricte: les dependances pointent vers le coeur metier. | `domain/`, `application/usecases`, `interfaces`, `infrastructure`. | Metier protege, bonne evolutivite long terme, tests rapides. | Peut sembler verbeuse pour petits projets. |

## Difference clé
- Couches: organise surtout la technique.
- Héxagonale/Clean: organise pour protéger le métier des détails techniques.

## Organisation de dossiers 

```text
src/
  domain/
    cart/
      Cart.ts
  application/
    cart/
      usecases/
        AddItemToCart.ts
      ports/
        CartRepository.ts
  interfaces/
    http/
      CartController.ts
  infrastructure/
    persistence/
      MySqlCartRepository.ts
```

## Exemple TypeScript 1: style en couches

```ts
// src/cart/CartController.ts
import { CartService } from "./CartService";

export class CartController {
  constructor(private readonly cartService: CartService) {}

  async addItem(req: { userId: string; productId: string; qty: number }) {
    return this.cartService.addItem(req.userId, req.productId, req.qty);
  }
}
```

```ts
// src/cart/CartService.ts
import { CartRepository } from "./CartRepository";

export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async addItem(userId: string, productId: string, qty: number) {
    if (qty <= 0) throw new Error("Quantity must be > 0");

    const cart = await this.cartRepository.findByUserId(userId);
    cart.items.push({ productId, qty });
    await this.cartRepository.save(cart);

    return cart;
  }
}
```

```ts
// src/cart/CartRepository.ts
export type CartItem = { productId: string; qty: number };
export type Cart = { userId: string; items: CartItem[] };

export interface CartRepository {
  findByUserId(userId: string): Promise<Cart>;
  save(cart: Cart): Promise<void>;
}
```

## Exemple TypeScript 2: style clean/hexagonal

```ts
// src/domain/cart/Cart.ts
export type CartItem = { productId: string; qty: number };

export class Cart {
  constructor(public readonly userId: string, public readonly items: CartItem[] = []) {}

  addItem(productId: string, qty: number) {
    if (qty <= 0) throw new Error("Quantity must be > 0");

    const existing = this.items.find((i) => i.productId === productId);
    if (existing) {
      existing.qty += qty;
      return;
    }

    this.items.push({ productId, qty });
  }
}
```

```ts
// src/application/cart/ports/CartRepository.ts
import { Cart } from "../../../domain/cart/Cart";

export interface CartRepository {
  findByUserId(userId: string): Promise<Cart>;
  save(cart: Cart): Promise<void>;
}
```

```ts
// src/application/cart/usecases/AddItemToCart.ts
import { CartRepository } from "../ports/CartRepository";

export class AddItemToCart {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(input: { userId: string; productId: string; qty: number }) {
    const cart = await this.cartRepository.findByUserId(input.userId);
    cart.addItem(input.productId, input.qty);
    await this.cartRepository.save(cart);
    return cart;
  }
}
```

```ts
// src/infrastructure/persistence/MySqlCartRepository.ts
import { Cart } from "../../domain/cart/Cart";
import { CartRepository } from "../../application/cart/ports/CartRepository";

export class MySqlCartRepository implements CartRepository {
  async findByUserId(userId: string): Promise<Cart> {
    // SQL + mapping
    return new Cart(userId, []);
  }

  async save(cart: Cart): Promise<void> {
    // SQL insert/update
  }
}
```

## Test unitaire 

```ts
// AddItemToCart.test.ts
import { Cart } from "../../../domain/cart/Cart";
import { CartRepository } from "../ports/CartRepository";
import { AddItemToCart } from "./AddItemToCart";

class InMemoryCartRepository implements CartRepository {
  private carts = new Map<string, Cart>();

  async findByUserId(userId: string): Promise<Cart> {
    if (!this.carts.has(userId)) this.carts.set(userId, new Cart(userId));
    return this.carts.get(userId)!;
  }

  async save(cart: Cart): Promise<void> {
    this.carts.set(cart.userId, cart);
  }
}

test("add item to cart", async () => {
  const repo = new InMemoryCartRepository();
  const useCase = new AddItemToCart(repo);

  const cart = await useCase.execute({ userId: "u1", productId: "p1", qty: 2 });

  expect(cart.items).toHaveLength(1);
  expect(cart.items[0]).toEqual({ productId: "p1", qty: 2 });
});
```

## Résume rapide
- Si votre projet est petit et trés CRUD: architecture en couches.
- Si votre métier évolue souvent et que vous voulez des tests rapides: `clean/hexagonale`.
- Le point le plus important n'est pas le nom des dossiers, mais le sens des dépendances.

## Arborescence type: architecture en couches

```text
src/
  presentation/
    http/
      controllers/
        CartController.ts
      routes/
        cart.routes.ts
      dtos/
        AddItemRequestDto.ts
  application/
    services/
      CartService.ts
    mappers/
      CartMapper.ts
  domain/
    models/
      Cart.ts
      CartItem.ts
    rules/
      CartRules.ts
  data/
    repositories/
      CartRepository.ts
      ProductRepository.ts
    orm/
      entities/
        CartEntity.ts
        ProductEntity.ts
  infrastructure/
    database/
      mysql/
        connection.ts
    cache/
      RedisClient.ts
  shared/
    errors/
      AppError.ts
    utils/
      date.ts
```

Flux typique:
`Controller -> Service -> Repository -> Database`

## Frameworks et applications qui utilisent souvent une approche en couches

### Frameworks
- **Spring Boot (Java)**: pattern très courant `Controller -> Service -> Repository` avec Spring MVC + Spring Data.
- **ASP.NET Core (C#)**: structure fréquente `Controllers`, couche `Application/Services`, `Infrastructure` pour EF Core/SQL.
- **Angular (TypeScript)**: organisation frequente en `components` (presentation), `services` (logique applicative) et `data services` (HTTP/API).
- **React (TypeScript)**: organisation frequente en `components` (presentation), hooks/services metier et clients API (fetch/axios).
- **Laravel (PHP)**: base MVC, et beaucoup d'équipes ajoutent des couches `Service` + `Repository` sur les projets métier.

### Types d'applications
- **Applications e-commerce** (catalogue, panier, commande, paiement) en monolithe.
- **Back-offices ERP/CRM** ou outils admin internes.
- **Applications bancaires legacy/line-of-business** avec forte separation UI/metier/data.
- **API CRUD d'entreprise** avec logique metier moderee et contraintes SQL fortes.

## Exemple de mapping concret (Spring Boot)
- `présentation`: `@RestController`
- `application`: `@Service`
- `data`: `@Repository`
- `infrastructure`: config DB (`DataSource`, migrations Flyway/Liquibase)

## Exemple de mapping concret (Angular)
- `presentation`: `components` + templates
- `application`: `services` + facades
- `data`: `HttpClient` + repositories/api services
- `infrastructure`: interceptors HTTP, config env, clients externes

## Exemple de mapping concret (React)
- `presentation`: composants + pages
- `application`: hooks metier / use-cases
- `data`: clients API (fetch/axios), repositories
- `infrastructure`: providers (auth, config), clients externes

## Types d'applications adaptees a la Clean Architecture

- **Fintech / banque / assurance**: règles métier complexes, audit, besoin de tests robustes.
- **Santé (medtech, dossier patient, workflow de soin)**: forte criticité métier et évolution règlementaire.
- **E-commerce a grande echelle**: promotions, pricing, stock, retours, différents canaux (web, mobile, marketplace).
- **SaaS B2B metier** (facturation, RH, legal, logistique): beaucoup de cas d'usage et de variantes clients.
- **Plateformes omnicanales** (API + web + mobile + batch): plusieurs interfaces autour du meme coeur métier.
- **Systemes avec intégrations multiples** (plusieurs DB, files de messages, APIs externes): besoin de ports/adaptateurs clairs.

## Frameworks/stacks ou la Clean Architecture est souvent appliquée

- **.NET / ASP.NET Core**: projets avec couches `Domain`, `Application`, `Infrastructure`, `API`.
- **Java / Spring Boot**: usage courant avec modules `domain`, `usecase`, `adapter`, `infrastructure`.
- **TypeScript / Angular ou React**: architecture clean possible cote frontend avec `presentation`, `domain`, `data` et use-cases testables.
- **Kotlin / Ktor ou Spring**: tres utilisee en backend metier avec DDD.
- **Flutter / Android** (mobile): `presentation`, `domain`, `data` pour isoler les cas d'usage.

Note importante: la Clean Architecture n'est pas liee a un framework precis. C'est un style de conception.

## Chapitre: MVC est-il une architecture en couches?

## 1. Réponse courte
Oui, **MVC peut s'intégrer dans une architecture en couches**, mais MVC ne décrit pas toute l'architecture applicative.

## 2. Ce que décrit MVC
MVC décrit surtout la façon de structurer l'interface et les interactions utilisateur:
- **Model**: données et état manipulés par l'UI
- **View**: rendu (HTML, template, composant visuel)
- **Controller**: recoit l'action utilisateur/HTTP et déclenche le traitement

`MVC` est donc principalement un pattern de couche présentation.

## 3. Ce que décrit l'architecture en couches
L'architecture en couches organise toute l'application:
- Couche présentation
- Couche application/métier
- Couche accés données
- Couche infrastructure

Elle couvre donc un périmetre plus large que MVC.

## 4. Positionnement concret
Dans beaucoup de projets:
- `Controller` (MVC) appartient à la couche présentation
- la vraie logique métier est dans `Service` (couche application)
- la persistence est dans `Repository` (couche data)

Flux typique:
`View -> Controller -> Service -> Repository -> Database`

## 5. Pourquoi on confond souvent
- Les frameworks web parlent beaucoup de MVC (Rails, Laravel, ASP.NET MVC).
- Sur petits projets, la logique métier est parfois mise dans les controllers.
- Du coup on croit que MVC = architecture complète, alors que c'est surtout la façade web.

## 6. Exemple d'arborescence (MVC dans une architecture en couches)

```text
src/
  presentation/
    mvc/
      controllers/
        OrderController.ts
      views/
        order-list.hbs
      models/
        OrderViewModel.ts
  application/
    services/
      OrderService.ts
  data/
    repositories/
      OrderRepository.ts
  infrastructure/
    database/
      mysql.ts
```

## 7. Quand MVC seul peut suffire
- Petit site web
- Peu de règles métier
- Projet court et simple

## 8. Quand MVC seul devient limite
- Logique métier riche
- Plusieurs interfaces (API + web + mobile)
- Besoin fort de tests unitaires métier
- Integration de plusieurs technos externes

Dans ces cas, MVC reste utile pour la présentation, mais on ajoute une vraie architecture applicative (couches, hexagonale, clean).

## 9. Regle pratique a retenir
- **MVC**: pattern d'interface et d'interaction.
- **Architecture en couches**: structure globale de l'application.
- On peut donc dire: "MVC est souvent une sous-partie de la couche presentation d'une architecture en couches".
