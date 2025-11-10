<?php
  // métodos HTTP permitidos
  $method = $_SERVER['REQUEST_METHOD'];

  $ultimoSegmento = end($segments);

  switch ($ultimoSegmento) {
    case 'login':
      if ($method === 'GET') {
          // recupera el usuario
          if (isset($_GET['username']) && $_GET['username']!="") {
            if (isset($_GET['password']) && $_GET['password']!="") {
              $username = $_GET['username'];
              //$password = base64_encode($_GET['password']);
              $password = password_hash($data['password'], PASSWORD_DEFAULT); // codificación segura
              // mejor recuperar el usuario y validar la contraseña que hacer consulta a BD con la contraseña
              /*
              $stmt = $pdo->query(
                "SELECT * FROM users WHERE username='$username' AND password='$password'"
              );
              $result = $stmt->fetch();
              if ($result>0) {
              }
              */
              $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
              $stmt->execute([$username]);
              $user = $stmt->fetch();

              if ($user && password_verify($_GET['password'], $user['password'])) {
                // login exitoso              
                if ($result['active']) {
                  // usuario activo              
                  $response['username'] = utf8_encode($result['username']);
                  $response['email'] = utf8_encode($result['email']);
                  $response['name'] = utf8_encode($result['name']);
                  $response['surname'] = utf8_encode($result['surname']);
                  // crea un token ficticio
                  $response['token'] = generateToken($pdo, $result['id'], $response);
                  echo json_encode($response);
                }else {
                  http_response_code(401);
                  echo json_encode(['error' => 'Usuario no valido']);  
                }
              }else {
                http_response_code(401);
                echo json_encode(['error' => 'Usuario no valido']);      
              }
            }else {
              http_response_code(401);
              echo json_encode(['error' => 'Contraseña no puede estar vacia']);    
            }
          }else{
            http_response_code(401);
            echo json_encode(['error' => 'Usuario no puede estar vacio']);  
          }
    
      }else{
        // método invalido
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
      }
    case 'create':
      if ($method === 'POST'){
        // añade un nuevo usuario
        $data = json_decode(file_get_contents('php://input'), true);        
        $username = isset($data['username'])?utf8_decode($data['username']):'';
        $email = isset($data['email'])?utf8_decode($data['email']):'';
        $name = isset($data['name'])?utf8_decode($data['name']):'';
        $surname = isset($data['surname'])?utf8_decode($data['surname']):'';
        $password = isset($data['password'])?password_hash($data['password'], PASSWORD_DEFAULT) : '';
        $active = true;
        $token = '';
  
        if ($username == '' || $email == '' || $name == '' || $password == '' ) {
          http_response_code(400);
          echo json_encode(['error' => 'Existen datos obligatorios no informados']);  
        }else{
          try {
            $stmt = $pdo->prepare(
              'INSERT INTO users (username, email, active, name, surname, password) VALUES (?, ?, ?, ?, ?, ?)');
            $stmt->execute([$username, $email, $active, $name, $surname, $password]);
      
            echo json_encode(['message' => 'Usuario añadido correctamente']);
          }
          catch(PDOException $exception){
            http_response_code(500);
            echo json_encode(['error' => $exception]);  
          } 
        }
      }else{
        // método invalido
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;      
      }
    default:
      // servicio no existe
      http_response_code(405);
      echo json_encode(['error' => 'Servicio no exite']);
      break;
  }

  function generateToken($pdo, $userId, $params=[]) {
    // Aquí se genera un token ficticio y lo guarda en base de datos (lo correcto es pasarlo a JWT)
    $token = base64_encode(json_encode($params));

    // guarda el token en base de datos por si se quiere usar para autologin u otras peticiones
    $stmt = $pdo->prepare('UPDATE users SET token=? WHERE id=?');
    $stmt->execute([$token, $userId]);

    return $token;
  }
?>