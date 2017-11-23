<?php
	include("db_info.php");

    $email = $_GET["email_azienda"];
    $pass = $_GET["pass"];
    $id = 0;

    $sql = "SELECT * FROM aziende";
    $result = $conn->query($sql);

    if($result->num_rows > 0)
    {
    	$values = [];

      	while($row = $result->fetch_assoc())
       	{

  			if($row["email_azienda"] === $email)
            {
            	if($row["password"] === $pass){


          	 		$data = $row["id_azienda"];

              }

            }

        }
      }
        header('Cache-control: no-cache, must-revalidate');
        header('Expires: mon, 01 jan 1970 05:00:00 GMT');       //non usare la cache
        header('content-type: application/json');               //ritorna un applicazione di tipo json
        echo json_encode($data);
      }

?>
