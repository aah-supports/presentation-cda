<?php

namespace App {
    class MysqlProductRepository
    {
        public function findAll(): array
        {
            // Simulation accès SQL
            return [
                ['id' => 1, 'name' => 'Burger'],
                ['id' => 2, 'name' => 'Pizza'],
            ];
        }
    }

    class ProductController
    {
        public function list(): array
        {
            // Couplage fort: la dépendance est créée ici.
            $repository = new MysqlProductRepository();
            return $repository->findAll();
        }
    }

    $controller = new ProductController();
    print_r($controller->list());
}

namespace Correction {
    interface ProductRepository
    {
        public function findAll(): array;
    }

    class MysqlProductRepository implements ProductRepository
    {
        public function findAll(): array
        {
            return [
                ['id' => 1, 'name' => 'Burger'],
                ['id' => 2, 'name' => 'Pizza'],
            ];
        }
    }

    class InMemoryProductRepository implements ProductRepository
    {
        public function findAll(): array
        {
            return [
                ['id' => 10, 'name' => 'Produit test'],
            ];
        }
    }

    class ProductController
    {
        public function __construct(private ProductRepository $repository)
        {
        }

        public function list(): array
        {
            return $this->repository->findAll();
        }
    }

    // Injection de dépendance: on choisit l'implémentation à l'extérieur.
    $controllerSql = new ProductController(new MysqlProductRepository());
    print_r($controllerSql->list());

    $controllerTest = new ProductController(new InMemoryProductRepository());
    print_r($controllerTest->list());
}
