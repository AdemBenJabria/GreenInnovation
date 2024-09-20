sed -i "s|%GEMINI_API_KEY%|$GEMINI_API_KEY|g" src/env.js

ng build --configuration production
