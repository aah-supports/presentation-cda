# Exercice simple - Clean Architecture

## Objectif
Completer un endpoint `GET /products` en respectant une structure clean architecture.

## Ce qui est deja pret
- Stack Docker: Node.js TypeScript + PostgreSQL
- Table `products` creee et hydratee au demarrage
- Wiring HTTP et dependances de base

## A faire
1. Completer `PostgresProductRepository.findAll()` dans `src/infrastructure/repositories/PostgresProductRepository.ts`
2. Completer `GetProductsUseCase.execute()` dans `src/application/usecases/GetProductsUseCase.ts`
3. Verifier que `GET /products` retourne les 3 produits

## Commandes
```bash
docker compose up --build
```

## URLs utiles
- API: `http://localhost:3001`
- Health: `http://localhost:3001/health`
- Products: `http://localhost:3001/products`
