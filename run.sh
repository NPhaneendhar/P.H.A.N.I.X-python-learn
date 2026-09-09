#!/usr/bin/env bash
# Startup script for PyLearn
set -e

PORT="${1:-8000}"
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

echo "=================================================="
echo " 🚀 Starting PyLearn Interactive Python App..."
echo " 🌐 URL: http://localhost:${PORT}"
echo "=================================================="
python3 server.py "${PORT}"
