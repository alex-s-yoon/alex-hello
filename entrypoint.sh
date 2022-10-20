#!/usr/bin/env bash

set -e

file_env() {
   local var="$1"
   local fileVar="${var}_FILE"
   local def="${2:-}"

   if [ "${!var:-}" ] && [ "${!fileVar:-}" ]; then
      echo >&2 "error: both $var and $fileVar are set (but are exclusive)"
      exit 1
   fi
   local val="$def"
   if [ "${!fileVar:-}" ]; then
      val="$(< "${!fileVar}")"
      export "$var"="$val"
      unset "$fileVar"
   fi
}

file_env "SECRET_KEY"
file_env "DB_USER"
file_env "DB_PASS"
file_env "MESSAGING_USER"
file_env "MESSAGING_PASS"
file_env "APM_TOKEN"

exec node app.js