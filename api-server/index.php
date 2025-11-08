<?php
  // se incluyen los datos de conexión
  require_once 'db.php';
  
  // Cabeceras
  header('Content-Type: application/json; charset=UTF-8');
  header('Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With');

  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
  }

  // métodos HTTP permitidos
  $method = $_SERVER['REQUEST_METHOD'];

  // Obtener la ruta desde la URL
  $uri = $_SERVER['REQUEST_URI'];

  // Eliminar parámetros de consulta
  $path = parse_url($uri, PHP_URL_PATH);

  // Quitar prefijo si usas algo como /api/
  $path = str_replace('/api/', '', $path);

  // Dividir la ruta en partes
  $segments = explode('/', trim($path, '/'));

  // Determinar el archivo PHP a cargar
  switch ($segments[0]) {
      case 'user':
          include 'user.php';
          break;
      case 'ships':
          include 'ships.php';
          break;
      default:
          http_response_code(404);
          echo "Ruta no encontrada.";
          break;
  }
?>