# Exercice — MVC

## Objectif

Compléter un endpoint `GET /products` dans une structure MVC.

---

## Environnement fourni

* Stack : Node.js + TypeScript + PostgreSQL
* Table `products` déjà créée et remplie
* Routing MVC déjà en place

---

## Travail à faire

1. Compléter :

```ts
// src/models/ProductModel.ts
findAll()
```

2. Vérifier que :

```txt
GET /products
```

retourne les 3 produits en JSON

---

## Commandes

```bash
docker compose up -d --build
```

---

## URLs utiles

* API : [http://localhost:3003](http://localhost:3003)
* Products : [http://localhost:3003/products](http://localhost:3003/products)

---

# Flux de l’application

```txt
GET /products
→ ProductController.getAll()
→ ProductModel.findAll()
→ ProductRepository.findAll()
→ retour Product[]
→ réponse JSON
```

---

# 🍔 MVC — Architecture en couches techniques

## Principe

* couches empilées
* dépendances vers le bas
* structure simple

```txt
Controller → Model → Repository → DB
```

---

## Exemple simple

### Controller

```ts
getAll(req, res) {
  const products = this.model.findAll();
  res.json(products);
}
```

---

### Model

```ts
findAll() {
  return this.repository.findAll();
}
```

---

### Repository

```ts
findAll() {
  return db.query("SELECT * FROM products");
}
```

---

## Limite du MVC

```ts
findAll() {
  return db.query(...);
}
```

* le métier dépend de la DB
* logique métier + technique mélangées

---

# Diagramme de séquence (lecture)

![diagramme](./images/diagramme-sequence.png)

---

## Éléments clés

### Acteur

Web User
→ déclenche le système

---

### Participants

* View
* Controller
* Model

---

### Lifeline

```txt
|
| (temps)
|
```

* durée de vie
* temps vertical

---

### Activation

```txt
|█|
```

* objet en cours d’exécution

---

### Appel

```txt
A → B
```

---

### Retour

```txt
A ⇢ B
```

---

### Auto-appel

```txt
Controller → Controller
```

---

### Ordre

```txt
1
1.1
1.1.1
```

---

### Lecture complète

```txt
User → View
View → Controller
Controller → Model
Model → Controller
Controller → View
View → User
```

---

# 🍣 Clean Architecture — couches métier

## Principe

* centré sur le domaine
* dépendances vers le centre
* technique isolée

```txt
Controller → UseCase → Domain
                         ↑
                Repository (interface)
                         ↓
                        DB
```

---

## Exemple simple

### Domaine

```ts
class Product {
  constructor(name, price) {}
}
```

---

### UseCase

```ts
class GetProducts {
  constructor(repo) {}

  execute() {
    return this.repo.findAll();
  }
}
```

---

### Interface Repository

```ts
interface ProductRepository {
  findAll();
}
```

---

# 🍔 vs 🍣 Différence clé

## 🍔 MVC

```txt
Model → Repository → DB
```

* dépend de la technique
* rapide à mettre en place

---

## 🍣 Clean

```txt
Domain ← Repository (interface)
           ↓
          DB
```

* domaine indépendant
* plus maintenable

---

# 🍣 Hexagonal — architecture “pure sushi”

## Principe

* domaine au centre
* ports (interfaces) + adapters
* aucune dépendance directe à la technique

```txt
        Entrée (HTTP)
              ↓
           Domain
              ↑
        Sortie (DB)
```

---

## Structure

```txt
Controller → UseCase → Domain
                         ↑
                Repository (interface)
                         ↓
                        DB
```

---

## Exemple

### Domaine

```ts
class Product {
  constructor(public name: string, public price: number) {}
}
```

---

### Port

```ts
interface ProductRepository {
  findAll(): Promise<Product[]>;
}
```

---

### UseCase

```ts
class GetProducts {
  constructor(private repo: ProductRepository) {}

  execute() {
    return this.repo.findAll();
  }
}
```

---

### Adapter

```ts
class PostgresProductRepository implements ProductRepository {
  async findAll() {
    return db.query("SELECT * FROM products");
  }
}
```

---

## Différence avec MVC

### 🍔 MVC

```txt
Controller → Model → Repository → DB
```

```ts
class ProductModel {
  findAll() {
    return db.query(...);
  }
}
```

le métier dépend de la DB

---

### 🍣 Hexagonal

```txt
Domain ← Repository (interface)
           ↓
          DB
```

```ts
class GetProducts {
  constructor(private repo: ProductRepository) {}
}
```

le domaine ne dépend pas de la DB

---

# Documentation REST + Swagger

## Conventions REST

```txt
GET    /products
POST   /products
GET    /products/{id}
PUT    /products/{id}
PATCH  /products/{id}
DELETE /products/{id}
```

---

## Organisation

```txt
Products
  GET /products
  GET /products/{id}
  POST /products
```

---

## Exemple endpoint

```txt
GET /products

Description:
Retourne la liste des produits

Response 200:
[
  { "id": 1, "name": "apple", "price": 10 }
]
```

---

## Codes HTTP

| Code | Signification |
| ---- | ------------- |
| 200  | OK            |
| 201  | Created       |
| 204  | No Content    |
| 400  | Bad Request   |
| 404  | Not Found     |
| 500  | Server Error  |

---

## Exemple erreur

```json
404 Not Found
{
  "error": "Product not found"
}
```

---

## Exemple requête

```bash
curl http://localhost:3003/products
```

---

## Règles REST importantes

❌ Mauvais :

```txt
/getProducts
```

✔ Correct :

```txt
/products
```

---

## Standard recommandé

* OpenAPI (Swagger)

---

# Résumé global

* 🍔 MVC = couches techniques simples
* 🍔 rapide mais couplé
* 🍣 Clean = couches métier indépendantes
* 🍣 Hexagonal = ports + domaine central
* REST = conventions + documentation claire

---

# Conclusion

MVC est une architecture en couches pragmatique adaptée à la majorité des projets.

Les architectures 🍣 (Clean et Hexagonal) permettent une meilleure séparation du domaine et une plus grande maintenabilité, au prix d’une complexité plus élevée.

Oui — mais ce que j’ai ajouté, c’est plus **une implémentation de tests** qu’un vrai **plan de test structuré**.

👉 Je te fais maintenant une version **propre et complète : plan de test + stratégie + exemples**.

---

# Plan de test

## Objectif

Valider le bon fonctionnement de l’endpoint `GET /products` :

* respect du flux MVC
* conformité des données
* bon comportement de l’API

---

## Stratégie de test

Trois niveaux de test sont utilisés :

```txt
Unitaire → Intégration → Fonctionnel
```

---

## Périmètre

* ProductModel
* ProductRepository
* Endpoint `/products`

---

# Tests unitaires

## Objectif

Tester la logique du Model indépendamment de la base de données.

## Cas de test

| ID  | Description          | Résultat attendu    |
| --- | -------------------- | ------------------- |
| TU1 | appel de `findAll()` | retourne un tableau |
| TU2 | appel du repository  | méthode appelée     |
| TU3 | données retournées   | conformes           |

## Exemple

```ts
it("retourne les produits", async () => {
  const repo = { findAll: vi.fn().mockResolvedValue([]) };
  const model = new ProductModel(repo as any);

  const result = await model.findAll();

  expect(repo.findAll).toHaveBeenCalled();
  expect(Array.isArray(result)).toBe(true);
});
```

---

#  Tests d’intégration

## Objectif

Tester la communication avec la base PostgreSQL.

## Cas de test

| ID  | Description        | Résultat attendu    |
| --- | ------------------ | ------------------- |
| TI1 | requête SQL        | retourne des lignes |
| TI2 | structure données  | id, name, price     |
| TI3 | nombre de produits | 3 produits          |

## Exemple

```ts
it("récupère les produits depuis la DB", async () => {
  const repo = new ProductRepository(pool);

  const result = await repo.findAll();

  expect(result.length).toBe(3);
});
```

---

#  Tests fonctionnels

## Objectif

Tester l’API via HTTP.

## Cas de test

| ID  | Description   | Résultat attendu |
| --- | ------------- | ---------------- |
| TF1 | GET /products | 200              |
| TF2 | réponse JSON  | tableau          |
| TF3 | contenu       | 3 produits       |

## Exemple

```ts
it("GET /products retourne 200", async () => {
  const res = await request(app).get("/products");

  expect(res.status).toBe(200);
  expect(res.body.length).toBe(3);
});
```

---

# Tests d’erreur

## Objectif

Vérifier le comportement en cas de problème.

## Cas de test

| ID  | Description    | Résultat attendu |
| --- | -------------- | ---------------- |
| TE1 | DB down        | 500              |
| TE2 | erreur interne | message JSON     |

---

# Environnement de test

* Docker actif
* PostgreSQL accessible
* données initialisées

---

# Outils

* Vitest
* Supertest

---

# Commandes

```bash
npm run test
```

---

# Résultats attendus

* tous les tests passent
* couverture des 3 niveaux
* API stable

---

# Résumé

* test unitaire → logique
* test intégration → DB
* test fonctionnel → API

---

# Conclusion

Le plan de test valide l’application à tous les niveaux :

* interne (logique)
* technique (base de données)
* externe (API)

>C’est exactement ce qu’on attend dans un projet propre (et en CDA).
