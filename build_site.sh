#!/bin/bash
# Gera o site publicado do Roteiro ao Vivo.
#  1. Junta roteiro-ao-vivo.html com site/firebase-config.js e grava site/index.html
#  2. Copia site/index.html para index.html na raiz do repositório
#     (o GitHub Pages publica a branch main, pasta raiz).
# Uso: ./build_site.sh
set -e
cd "$(dirname "$0")"
APP=roteiro-ao-vivo.html
CFG=site/firebase-config.js
[ -f "$APP" ] || { echo "Erro: $APP não encontrado."; exit 1; }
if [ ! -f "$CFG" ]; then
  echo "Aviso: $CFG não encontrado. O site vai funcionar só em modo local (sem sincronizar)."
  CFG=/dev/null
fi
mkdir -p site
awk -v cfg="$CFG" '
  /<!--FIREBASE_CONFIG-->/ { print "<script>"; while ((getline linha < cfg) > 0) print linha; print "</script>"; next }
  { print }
' "$APP" > site/index.html
cp site/index.html index.html
touch .nojekyll
echo "Pronto: site/index.html e index.html atualizados."
