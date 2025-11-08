<?php 
// configuración de la conexión
  $host = 'qvf541.pepebelmonte.es';
  $dbname = 'qvf541';
  $username = 'qvf541';
  $password = 'Prueba_001';
  /*
  $host = 'localhost';
  $dbname = 'pepebelmonte';
  $username = 'root';
  $password = '';
  */

  try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  } catch (PDOException $e) {
    die("Error al conectar con la base de datos: " . $e->getMessage());
  }
?>  