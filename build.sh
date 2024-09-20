#!/bin/bash

# Affiche la valeur de GEMINI_API_KEY avant remplacement
echo "Clé API fournie par Render : $GEMINI_API_KEY"

# Vérifie si la clé API est bien définie
if [ -z "$GEMINI_API_KEY" ]; then
  echo "Erreur : GEMINI_API_KEY n'est pas définie. Assurez-vous qu'elle est configurée dans Render."
  exit 1
fi

# Affiche le contenu du fichier env.js avant modification
echo "Contenu de src/env.js avant remplacement :"
cat src/env.js

# Remplacement de la variable d'environnement dans env.js
echo "Remplacement de %GEMINI_API_KEY% par $GEMINI_API_KEY dans src/env.js"
sed -i "s|%GEMINI_API_KEY%|$GEMINI_API_KEY|g" src/env.js

# Vérifie si le remplacement a bien eu lieu
echo "Contenu de src/env.js après remplacement :"
cat src/env.js

# Ajoute un fichier de test pour vérifier que le remplacement fonctionne bien
echo "console.log('Clé API dans test-env.js : %GEMINI_API_KEY%');" > src/test-env.js
sed -i "s|%GEMINI_API_KEY%|$GEMINI_API_KEY|g" src/test-env.js

# Vérifie le contenu de test-env.js après remplacement
echo "Contenu de src/test-env.js après remplacement :"
cat src/test-env.js

# Construction de l'application Angular avec la configuration de production
echo "Lancement de la construction de l'application Angular"
ng build --configuration production

# Vérification finale du build
if [ $? -eq 0 ]; then
  echo "Build réussi."
else
  echo "Erreur lors du build."
  exit 1
fi
