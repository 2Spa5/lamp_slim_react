<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AlunniController
{
  
  public function index(Request $request, Response $response, $args){
    sleep(1);
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("SELECT * FROM alunni");
    $results = $result->fetch_all(MYSQLI_ASSOC);

    $response->getBody()->write(json_encode($results));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function post(Request $request, Response $response, $args){
    sleep(1);
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $data = json_decode($request->getBody(), true);
    
    $n = $data["nome"];
    $c = $data["cognome"];

    $mysqli_connection->query("INSERT INTO alunni (nome, cognome) VALUES ('$n', '$c')");
    $response->getBody()->write(json_encode($data));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function put(Request $request, Response $response, $args){
    sleep(1);
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $data = json_decode($request->getBody(), true);
    $n = $data["nome"];
    $c = $data["cognome"];
    $id = $args["id"];
    $kek = true;

    if($n != ""){
      $result = $mysqli_connection->query("UPDATE alunni SET nome = '$n' WHERE id = $id");
      if(!$result)
        $kek = false;
    }

    if($c != ""){
      $result = $mysqli_connection->query("UPDATE alunni SET cognome = '$c' WHERE id = $id");
      if(!$result)
        $kek = false;
    }

    if($kek)
      $code = 200;
    else
      $code = 500;
    
    return $response->withHeader("Content-type", "application/json")->withStatus($code);
  }

  public function delete(Request $request, Response $response, $args){
    sleep(1);
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $mysqli_connection->query("DELETE FROM alunni WHERE id = ". $args["id"]);
    return $response->withHeader("Content-type", "application/json")->withStatus(201);
  }
}
