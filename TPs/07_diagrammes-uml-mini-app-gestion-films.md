# Diagrammes UML - Mini application Gestion de films

## 1. Objectif
Ce document centralise les diagrammes UML a fournir dans un dossier CDA pour prouver la conception.

## 2. Fichiers UML fournis

- `TPs/uml/01_use-case-gestion-films.puml`
- `TPs/uml/02_classes-gestion-films.puml`
- `TPs/uml/03_sequence-ajouter-film.puml`
- `TPs/uml/04_activite-rechercher-film.puml`
- `TPs/uml/05_composants-architecture.puml`

## 3. Comment les utiliser dans le dossier CDA

### 3.1 Partie "Specifications fonctionnelles"
- Inserer le diagramme de cas d'utilisation
- Inserer le diagramme d'activite (parcours de recherche)

### 3.2 Partie "Specifications techniques"
- Inserer le diagramme de classes
- Inserer le diagramme de sequence (ajout film)
- Inserer le diagramme de composants (architecture)

### 3.3 Lien avec les autres documents du TP
- `01_cahier-des-charges-...` : besoin et perimetre
- `03_specifications-fonctionnelles-...` : fonctionnalites
- `04_specifications-techniques-...` : choix techniques et securite

## 4. Export en image (PNG/SVG)
PlantUML n'etant pas installe dans cet environnement, les sources `.puml` sont fournies pretes a exporter.

Exemple de commande locale (si PlantUML est installe):

```bash
plantuml -tsvg TPs/uml/*.puml
```

Les images generees peuvent ensuite etre ajoutees dans le dossier CDA final.

## 5. Conseils de presentation au jury
- Montrer d'abord le cas d'utilisation (vue metier)
- Enchainer avec sequence + classes (vue implementation)
- Terminer par composants (vue architecture globale)
- Rester coherent avec le code et les tests presentes
