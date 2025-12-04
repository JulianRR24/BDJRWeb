<?php
// backend/config.php

// Allow CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Supabase Configuration
// IMPORTANTE: Reemplaza estos valores con los de tu proyecto en Supabase
define('SUPABASE_URL', 'https://hmtnewymuanlvdbfdmrh.supabase.co'); 
define('SUPABASE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtdG5ld3ltdWFubHZkYmZkbXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxODE3ODcsImV4cCI6MjA3OTc1Nzc4N30.midJmbMWczpGBRnrXHzjNS1xkeu7wowT9JTWKeocGyU');

// Error Reporting (Desactivar en producción)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
?>
