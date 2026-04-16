# starter-cart

TP backend TypeScript/Express pour un panier, avec 2 persistances:
- `memory`
- `postgres`

## Énoncé
Objectif: implémenter une API panier en couches (`router -> controller -> service -> storage`) qui:
1. ajoute un produit au panier
2. vérifie la quantité et le stock
3. liste le panier
4. change de persistance via `STORAGE_DRIVER` sans toucher le métier

Routes:
- `GET /api/products`
- `POST /api/product`
- `POST /api/products` (alias)

Body POST:
```json
{ "productId": "aa1", "quantity": 2 }
```

## MCD (PostgreSQL)

![MCD starter-cart](./MCD.png)

Tables utilisées:
- `products`
- `inventories`
- `cart_items`

## Démarrage

`.env`:
```env
PORT=3000
STORAGE_DRIVER=memory
DATABASE_URL=postgres://cart:cart@postgres:5432/cartdb
```

Lancer:
```bash
# memory
STORAGE_DRIVER=memory docker compose up --build

# postgres
STORAGE_DRIVER=postgres docker compose up --build
```

Base URL: `http://localhost:3015/api`

## Plan de test (version enrichie CDA)

### 1. Objectif du plan
Vérifier la conformité fonctionnelle de l'API panier, la robustesse des règles métier, et la cohérence du comportement entre les deux modes de persistance.

### 2. Périmètre
Inclus:
- endpoints API du panier
- règles métier (quantité, stock, existence produit)
- persistance `memory` et `postgres`

Exclus:
- test de charge avancé
- audit sécurité OWASP complet
- tests UI (pas d'interface front dans ce TP)

### 3. Exigences de référence
- `E01` Consulter le panier
- `E02` Ajouter un produit au panier
- `E03` Refuser une quantité invalide
- `E04` Refuser un produit inexistant
- `E05` Refuser un stock insuffisant
- `E06` Supporter 2 drivers (`memory`, `postgres`) avec même comportement métier
- `E07` Conserver les données en mode postgres si le volume Docker est conservé

### 4. Matrice de traçabilité (exigences -> tests)

| Exigence | Tests associés |
|---|---|
| E01 | T01, T03 |
| E02 | T02, T07 |
| E03 | T04, T05 |
| E04 | T06 |
| E05 | T08 |
| E06 | T01 à T09 en `memory` puis en `postgres` |
| E07 | T10 |

### 5. Environnement de test
- Runtime: Node.js 20 (dans Docker)
- Base de données: PostgreSQL 16
- Orchestration: Docker Compose
- Outils: `curl` / Postman

Initialisation propre recommandée:
```bash
docker compose down -v --remove-orphans
```

### 6. Critères d'entrée / sortie
Critères d'entrée:
- Docker opérationnel
- ports libres (`3015`, `5438`, `8081`)
- image reconstruite (`docker compose up --build`)

Critères de sortie:
- 100% des tests critiques passés
- 0 anomalie bloquante
- 0 anomalie majeure ouverte sur le flux nominal

### 7. Jeux de tests fonctionnels

| ID | Priorité | Cas | Requête | Résultat attendu |
|---|---|---|---|---|
| T01 | Critique | Lecture panier initial | `GET /api/products` | `200`, JSON valide |
| T02 | Critique | Ajout nominal | `POST /api/product` avec `aa1,2` | `201`, stock décrémenté |
| T03 | Critique | Vérifier panier après ajout | `GET /api/products` | ligne `aa1`, `quantity=2` |
| T04 | Critique | Quantité nulle | `POST /api/product` qty `0` | `400`, `QUANTITY_INVALID` |
| T05 | Critique | Quantité négative | `POST /api/product` qty `-1` | `400`, `QUANTITY_INVALID` |
| T06 | Critique | Produit inconnu | `POST /api/product` `productId=zzz` | `400`, `PRODUCT_NOT_FOUND` |
| T07 | Majeure | Route alias | `POST /api/products` | même comportement que `/api/product` |
| T08 | Critique | Stock insuffisant | `POST /api/product` qty `999` | `400`, `STOCK_NOT_ENOUGH` |
| T09 | Majeure | Type invalide | `POST /api/product` qty `"2"` | `400`, `QUANTITY_INVALID` |
| T10 | Critique | Persistance postgres | restart app sans `-v` | données conservées |

### 8. Tests non fonctionnels minimum
- `NF01` Robustesse payload: body manquant ou mal formé -> réponse 4xx, pas de crash
- `NF02` Disponibilité démarrage: app prête < 30s après `docker compose up`
- `NF03` Cohérence transactionnelle (postgres): pas de stock négatif après erreurs

### 9. Procédure d'exécution
1. Exécuter T01 à T09 en mode `memory`
2. Exécuter T01 à T10 en mode `postgres`
3. Archiver les résultats (OK/KO) dans un tableau de recette

Exemple de commandes:
```bash
curl -s http://localhost:3015/api/products

curl -s -X POST http://localhost:3015/api/product \
  -H "Content-Type: application/json" \
  -d '{"productId":"aa1","quantity":2}'

curl -s -X POST http://localhost:3015/api/product \
  -H "Content-Type: application/json" \
  -d '{"productId":"aa1","quantity":0}'
```

### 10. Modèle de suivi d'anomalie
Pour chaque anomalie:
- ID
- contexte / prérequis
- étapes de reproduction
- résultat attendu
- résultat observé
- gravité (`Bloquante`, `Majeure`, `Mineure`)
- statut (`Ouverte`, `En cours`, `Corrigée`)

### 11. PV de recette (résumé attendu)
- Date de campagne
- Version testée
- Nombre de cas exécutés
- Nombre de cas OK / KO
- Liste des anomalies restantes
- Décision finale: `GO` / `NO GO`
