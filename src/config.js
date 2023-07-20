import {config} from 'dotenv';

config()

export const PORT=process.env.PORT||3000
export const DB_USER=process.env.DB_USER||'u118138873_cesepiadm'
export const DB_PASSWORD=process.env.DB_PASSWORD||'t0.,36/2I'
export const DB_HOST=process.env.DB_HOST||'srv716.hstgr.io'
export const DB_DATABASE=process.env.DB_DATABASE||'u118138873_bddcesep'
export const DB_PORT=process.env.DB_PORT|| 3306