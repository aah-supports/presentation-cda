# starter-cart (TypeScript + Express)

Objectif: realiser un mini projet panier en couches en partant d'un squelette minimal.

## Demarrage Docker

Mode memory:

```bash
STORAGE_DRIVER=memory docker compose up --build
```

Mode postgres:

```bash
STORAGE_DRIVER=postgres docker compose up --build
```

URL de base:

- `http://localhost:3015/api`
- `http://localhost:3015/api/health`

PostgreSQL (pour le mode `postgres`):

- host: `localhost`
- port: `5438`
- db: `cartdb`
- user: `cart`
- password: `cart`

## Etapes a realiser (pas a pas)

1. Creer `src/models/Product.ts`
- Interface `Product` avec `name`, `price`, `stock`, `inCart`.

2. Creer `src/storage/IStorage.ts`
- Interface de persistance avec les methodes:
  - `getProducts()`
  - `addCatalogProduct()`
  - `addToCart(name, quantity)`
  - `removeFromCart(name)`
  - `removeQuantityFromCart(name, quantity)`
  - `cancelCart()`
  - `checkout()`
  - `cartTotal()`

3. Creer `src/storage/MemoryStorage.ts`
- Persistance en memoire (tableau de produits), sans base de donnees.

4. Creer `src/storage/PostgresStorage.ts`
- Persistance PostgreSQL avec le meme contrat `IStorage`.
- Creer la table et les donnees initiales si necessaire.

5. Creer `src/storage/createStorage.ts`
- Factory de selection:
  - `STORAGE_DRIVER=memory` -> `MemoryStorage`
  - `STORAGE_DRIVER=postgres` -> `PostgresStorage`
- Aucun changement metier hors de cette factory.

6. Creer `src/services/CartService.ts`
- Regles metier:
  - ajouter un produit avec quantite
  - retirer un produit
  - retirer une quantite
  - annuler un panier
  - valider une commande (`checkout`)
  - calculer total panier

7. Creer `src/controllers/CartController.ts`
- Centraliser les actions d'achat:
  - `addItem`
  - `decreaseItem`
  - `removeItem`
  - `cancelCart`
  - `checkout`
  - `getCartTotal`

8. Completer `src/router.ts`
- `GET /api/products`
- `POST /api/products`
- `GET /api/cart`
- `GET /api/cart/total`
- `POST /api/cart/items` (body: `{ "name": "apple", "quantity": 2 }`)
- `PATCH /api/cart/items/:name/decrease` (body: `{ "quantity": 1 }`)
- `DELETE /api/cart/items/:name`
- `POST /api/cart/cancel`
- `POST /api/cart/checkout`

9. Brancher la factory dans `src/server.ts`
- Le serveur doit creer le storage via `createStorage()`.

## Attendu final

- API operationnelle en TypeScript pur
- architecture simple en couches
- **deux persistances implementees** (`MemoryStorage` + `PostgresStorage`)
- **switch de persistance sans toucher au metier** (via `STORAGE_DRIVER`)
- execution complete via Docker

## Tests fonctionnels obligatoires (avant rendu)

1. `GET /api/health` retourne `200`.
2. `GET /api/products` retourne les produits initiaux.
3. `POST /api/products` cree un produit valide (`201`).
4. Doublon produit retourne `400 PRODUCT_ALREADY_EXISTS`.
5. `POST /api/cart/items` ajoute un produit (`201`).
6. Quantite invalide retourne `400 QUANTITY_INVALID`.
7. Stock insuffisant retourne `400 STOCK_NOT_ENOUGH`.
8. `GET /api/cart` retourne `items` + `total`.
9. `GET /api/cart/total` retourne le meme total.
10. `PATCH /api/cart/items/:name/decrease` retire une quantite.
11. Retrait trop grand retourne `400 BAD_QUANTITY`.
12. `DELETE /api/cart/items/:name` retourne `204`.
13. `POST /api/cart/cancel` vide le panier.
14. `POST /api/cart/checkout` retourne `400 CART_EMPTY` sur panier vide.
15. `POST /api/cart/checkout` sur panier rempli retourne `orderId`, `finalTotal`, `status`.
16. Toute la suite passe en `STORAGE_DRIVER=memory`.
17. Toute la suite passe en `STORAGE_DRIVER=postgres`.
18. En mode postgres, apres restart API, les donnees persistent.

## Diagramme de classes obligatoire (Draw.io)

Vous devez livrer un diagramme de classes UML realise avec **Draw.io**:

- outil impose: `https://app.diagrams.net/`
- format source impose: `.drawio`
- chemin impose: `diagrammes/cart-class-diagram.drawio`
- export recommande pour lecture GitHub: `diagrammes/cart-class-diagram.svg`

Le diagramme doit montrer au minimum:

- `Product`
- `IStorage`
- `MemoryStorage`
- `PostgresStorage`
- `createStorage` (factory)
- `CartService`
- `CartController`
- les relations entre ces classes/interfaces
