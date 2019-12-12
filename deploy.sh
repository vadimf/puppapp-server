#!/bin/sh

ssh root@dev.globalbit.io << EOF
    cd /var/www/puppapp-api.dev.globalbit.io
    git pull
    yarn
    git reset --hard
    yarn build
    pm2 restart puppapp --update-env
EOF
