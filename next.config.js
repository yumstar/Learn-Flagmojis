/** @type {import('next').NextConfig} */
import dotenv from 'dotenv'
dotenv.config()
import './.env'
const nextConfig = {
  reactStrictMode: true,
  env: {
    DB_URI: process.env.DB_URI
  }
}

module.exports = nextConfig
