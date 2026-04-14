# Glossaire Tests (CDA) - Definitions + exemples JS/PHP

## 1. Termes essentiels

1. **Test unitaire**
Verifie une unite de code isolee (fonction, classe, methode) sans dependances externes.

2. **Test d'integration**
Verifie la collaboration entre plusieurs composants (ex: service + repository + base).

3. **Test fonctionnel**
Verifie qu'une fonctionnalite repond au besoin metier vu par l'utilisateur.

4. **Test end-to-end (E2E)**
Teste un scenario complet du point d'entree (UI/API) jusqu'au resultat final.

5. **Assertion**
Verification explicite dans un test (ex: egalite, presence, erreur attendue).

6. **Mock**
Double de test qui simule un composant externe avec un comportement controle.

7. **Stub**
Double simple qui renvoie une valeur predefinie pour isoler le test.

8. **Fixture (jeu de donnees de test)**
Donnees connues et stables utilisees pour executer les tests de maniere reproductible.

9. **Couverture de tests (coverage)**
Pourcentage de code execute par les tests (indicateur utile, mais pas une garantie de qualite a lui seul).

10. **Non-regression**
Test qui verifie qu'une correction ou une evolution ne casse pas un comportement deja valide.

11. **Test smoke**
Test rapide de sante de l'application (demarrage, routes critiques, reponse minimale attendue).

12. **Pyramide des tests**
Strategie: beaucoup de tests unitaires, moins d'integration, peu de E2E.

13. **TDD (Test-Driven Development)**
Approche Red -> Green -> Refactor: ecrire le test avant le code de production.

14. **Flaky test**
Test instable qui passe ou echoue de facon aleatoire (a corriger rapidement).

## 2. Exemples JavaScript (Jest)

### 2.1 Test unitaire (fonction pure)

```js
// sum.js
export function sum(a, b) {
  return a + b;
}
```

```js
// sum.test.js
import { sum } from './sum.js';

test('sum additionne deux nombres', () => {
  expect(sum(2, 3)).toBe(5);
});
```

### 2.2 Test avec mock

```js
// movieService.js
export async function countMovies(repo) {
  const rows = await repo.findAll();
  return rows.length;
}
```

```js
// movieService.test.js
import { countMovies } from './movieService.js';

test('countMovies compte les films retournes par le repo', async () => {
  const repoMock = { findAll: jest.fn().mockResolvedValue([{ id: 1 }, { id: 2 }]) };
  await expect(countMovies(repoMock)).resolves.toBe(2);
  expect(repoMock.findAll).toHaveBeenCalledTimes(1);
});
```

## 3. Exemples PHP (PHPUnit)

### 3.1 Test unitaire

```php
<?php
// src/Calculator.php
final class Calculator {
    public function add(int $a, int $b): int {
        return $a + $b;
    }
}
```

```php
<?php
// tests/CalculatorTest.php
use PHPUnit\Framework\TestCase;

final class CalculatorTest extends TestCase {
    public function testAdd(): void {
        $calculator = new Calculator();
        $this->assertSame(5, $calculator->add(2, 3));
    }
}
```

### 3.2 Test d'integration simple (service + repository mocke)

```php
<?php
interface MovieRepository {
    public function findAll(): array;
}

final class MovieService {
    public function __construct(private MovieRepository $repo) {}

    public function count(): int {
        return count($this->repo->findAll());
    }
}
```

```php
<?php
use PHPUnit\Framework\TestCase;

final class MovieServiceTest extends TestCase {
    public function testCountUsesRepository(): void {
        $repo = $this->createMock(MovieRepository::class);
        $repo->method('findAll')->willReturn([['id' => 1], ['id' => 2], ['id' => 3]]);

        $service = new MovieService($repo);
        $this->assertSame(3, $service->count());
    }
}
```

## 4. Bonnes pratiques pour le dossier CDA

- Toujours relier un test a un besoin fonctionnel.
- Presenter un jeu d'essai: entree, attendu, obtenu.
- Montrer au moins un test qui passe et un cas d'erreur controle.
- Indiquer ce qui est teste (scope) et ce qui ne l'est pas (limites).
- Eviter les tests fragiles dependants du temps, du reseau ou de l'ordre d'execution.
