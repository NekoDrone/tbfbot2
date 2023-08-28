<?php

use Google\CloudFunctions\FunctionsFramework;
use Psr\Http\Message\ServerRequestInterface;

// Register the function with Functions Framework.
// This enables omitting the `FUNCTIONS_SIGNATURE_TYPE=http` environment
// variable when deploying. The `FUNCTION_TARGET` environment variable should
// match the first parameter.

FunctionsFramework::http('collectNewCaseData', 'collectNewCaseData');

$targetURL = getenv('TARGET_URL');
$curl_session = curl_init($targetURL);

function collectNewCaseData(ServerRequestInterface $request) {
    $body = $request->getBody()->getContents();
    $jsonData = convertUrlDataToJson($body);
    $response = sendAsJsonToTarget($jsonData, $targetURL);
    return $response;
}

function convertUrlDataToJson($urlEncodedData) {
    parse_str($urlEncodedData, $data);
    return json_encode($data);
}

function sendAsJsonToTarget($jsonData, $targetURL) {
    curl_setopt($curl_session, CURLOPT_POST, true);
    curl_setopt($curl_session, CURLOPT_POSTFIELDS, $jsonData);
    curl_setopt($curl_session, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl_session, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($jsonData)
    ));
    $response = curl_exec($curl_session);
    return $response;
}