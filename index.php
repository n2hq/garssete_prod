<?php
$dbuser = "comvoinh_dbdirpro";
$dbhost = "localhost";
$dbpass = "Querty123$$$$";
$dbname = "comvoinh_dbdirpro";
$dbport = 3306;

$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

// Check connection
if ($conn->connect_error) {
    die("❌ Connection failed: " . $conn->connect_error);
}

$msg = "✅ ";

//echo "✅ Connected successfully!";


?>
<html>
    <head>
        <title>Garssete - Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            .flex_container{
                display:flex; 
                justify-content:center; 
                align-items:center; 
                height:100vh;
            }

            .centered_div{
                width:auto; 
                height:100px; 
                text-align:center; 
                line-height:100px;
                font-family:'Arial';
                font-size:17px; 
            }
        </style>
    </head>
    <body>
    <div class="flex_container">
        <div class="centered_div">
            <?php echo $msg; ?>Maintenance...
        </div>
    </div>

    </body>
</html>