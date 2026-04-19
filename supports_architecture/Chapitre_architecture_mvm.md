## Le MVVM variation du modèle MVC

### Plan du cours général

[plan du cours](./00_plan.md)

Le modèle MVVM (Modèle-Vue-Modèle de Vue) peut être adapté à l'architecture en composants. 

🍅 Dans le contexte de l'architecture en composants, le modèle MVVM peut être utilisé pour organiser les composants de l'application de manière à ce que chaque composant soit responsable d'une partie spécifique de l'application, **tout en maintenant une séparation claire des préoccupations**.

MVVM adapté à l'architecture en composants :

1. **Composants métier (Modèles) M:** Les composants métier de l'application peuvent être représentés par les modèles dans le modèle MVVM. Chaque composant métier est responsable de la manipulation des données et de la mise en œuvre des règles métier associées. Ces composants peuvent être conçus de manière à être réutilisables et indépendants les uns des autres.

2. **Composants d'interface utilisateur (Vues) V:** Les composants d'interface utilisateur de l'application peuvent être représentés par les vues dans le modèle MVVM. Chaque composant d'interface utilisateur est responsable de l'affichage des données au format approprié pour l'utilisateur. Ces composants peuvent être conçus de manière à être réutilisables et indépendants des autres composants d'interface utilisateur.

3. **Modèles de vue (ViewModels) VM :** Les modèles de vue agissent comme des adaptateurs entre les composants métier (modèles) et les composants d'interface utilisateur (vues). 

🍅 Ils récupèrent les données des composants métier et les formattent pour être affichées dans les composants d'interface utilisateur. Ils gèrent également les interactions utilisateur et mettent à jour les composants métier en conséquence.

🔖 MVVM favorise la flexibilité, la maintenabilité et la scalabilité de l'application.

### Plan du cours général

[plan du cours](./00_plan.md)