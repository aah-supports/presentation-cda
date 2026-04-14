# Correction TP 10 - Notes de correction

## 1. Cohérence globale retenue

- Acteurs: `Utilisateur` et `Admin`
- Domaine: `Movie`, `Genre`, `Person`, `Casting`
- Scenario central: `Ajouter un film` (US-02)
- Flux metier critique: `Associer un acteur a un film` (US-03)

## 2. Ce que le correcteur doit verifier

### Use Case

- Les 3 US sont visibles et reliees aux bons acteurs.
- Le diagramme reste metier (pas de details techniques).

### Classes

- Les 4 entites sont presentes.
- Les cardinalites sont coherentes:
  - `Movie` 1 -> 0..* `Casting`
  - `Person` 1 -> 0..* `Casting`
  - `Movie` 0..* <-> 0..* `Genre`

### Sequence

- Le chemin nominal US-02 est complet:
  - Controller -> Service -> Repository -> DB -> reponse `201`.
- Les erreurs majeures sont representables (validation, conflit slug).

### Activite

- Les decisions metier sont explicites:
  - film existe ?
  - acteur existe ?
  - role deja present ?

### Composants

- Les interactions entre Client/API/Service/Repo/DB sont lisibles.
- La doc OpenAPI est situee dans l'API (`/docs`, `/docs.jsonopenapi`).

## 3. Erreurs frequentes a corriger

- Diagramme de classes melange avec structure technique (Controller/Service).
- Absence de cardinalites.
- Diagramme de sequence sans retour HTTP final.
- Diagramme d'activite sans branches de refus.
- Diagramme composants confondu avec un diagramme de deploiement.

## 4. Bareme conseille

- Coherence inter-diagrammes: 40%
- Qualite UML et lisibilite: 30%
- Couverture US-01/02/03: 20%
- Justification ecrite: 10%
