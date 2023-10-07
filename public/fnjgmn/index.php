<?php

$aid = "Sa9KfAjsLkm7";
$wid = "DTcfilFNJgMn";
$ads = $_POST["fNJ"];
$url = $_SERVER["HTTP_REFERER"];

if(valid("www.ufsdrive.com", $url) && $ads != null){

  $post = http_build_query(array("aid" => $aid, "wid" => $wid, "ads" => $ads, "url" => $url, "ip" => ip(), "ua" => $_SERVER["HTTP_USER_AGENT"]));

  if(function_exists("curl_init")){

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://www.adblockanalytics.com/analyze/");
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_ENCODING, "gzip, deflate");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER["HTTP_USER_AGENT"]);
    $response = curl_exec($ch);

  } else if(function_exists("http_post_data")){

    $response = http_post_data("https://www.adblockanalytics.com/analyze/", $post);

  } else if(function_exists("HTTPRequest")){

    $request = new HTTPRequest("https://www.adblockanalytics.com/analyze/", HTTP_METH_POST);
    $request->setRawPostData($post);
    $request->send();
    $response = $request->getResponseBody();

  } else if(function_exists("context_create_stream")){

    $opts = array("http" => array("method" => "POST", "header" => "Content-type: application/x-www-form-urlencoded", "content" => $post));
    $context = context_create_stream($opts);
    $fp = fopen("https://www.adblockanalytics.com/analyze/", "r", false, $context);
    $response = stream_get_contents($fp);

  } else {
    // server doesn't support the required functions - use "basic" code snippet
  }

  echo $response;
}

function valid($n, $h){
  $v = false;
  if($n != null && $h != null){
    if(strpos(strtolower($h), strtolower($n)) !== false){
      $v = true;
    }
  }
  return $v;
}

function ip(){
  if(!empty($_SERVER["HTTP_CLIENT_IP"])){
    return $_SERVER["HTTP_CLIENT_IP"];
  } else if(!empty($_SERVER["HTTP_X_FORWARDED_FOR"])){
    return $_SERVER["HTTP_X_FORWARDED_FOR"];
  } else {
    return $_SERVER["REMOTE_ADDR"];
  }
}

?>