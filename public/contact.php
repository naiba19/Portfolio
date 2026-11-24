<?php

declare(strict_types=1);

$siteEmail = 'naiba.radshabov@outlook.de';
$testMode = getenv('CONTACT_TEST_MODE') === '1';
$mailEnabled = getenv('CONTACT_ENABLE_MAIL') === '1';
$productionOrigins = [
    'https://naibaradshabov.developerakademie.net',
];
$allowedOrigins = array_merge([
    'http://localhost:4200',
    'http://127.0.0.1:4200',
], $productionOrigins);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');
header('X-Frame-Options: DENY');

function respond(int $status, array $data): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? null;
if ($origin !== null) {
    if (!in_array($origin, $allowedOrigins, true)) {
        respond(403, ['success' => false, 'error' => 'Origin not allowed']);
    }

    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}

$method = $_SERVER['REQUEST_METHOD'] ?? '';

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($method !== 'POST') {
    header('Allow: POST, OPTIONS');
    respond(405, ['success' => false, 'error' => 'Method not allowed']);
}

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (!preg_match('~^application/json(?:\s*;|$)~i', $contentType)) {
    respond(415, ['success' => false, 'error' => 'Content type must be application/json']);
}

$maxBodyBytes = 16384;
$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > $maxBodyBytes) {
    respond(413, ['success' => false, 'error' => 'Request too large']);
}

$input = file_get_contents('php://input', false, null, 0, $maxBodyBytes + 1);
if ($input === false || strlen($input) > $maxBodyBytes) {
    respond(413, ['success' => false, 'error' => 'Request too large']);
}

try {
    $params = json_decode($input, false, 16, JSON_THROW_ON_ERROR);
} catch (JsonException) {
    respond(400, ['success' => false, 'error' => 'Invalid JSON']);
}

if (!is_object($params)) {
    respond(400, ['success' => false, 'error' => 'Invalid JSON structure']);
}

$name = $params->name ?? null;
$email = $params->email ?? null;
$message = $params->message ?? null;
$website = $params->website ?? '';

if (!is_string($name) || !is_string($email) || !is_string($message) || !is_string($website)) {
    respond(400, ['success' => false, 'error' => 'Invalid input types']);
}

if ($website !== '') {
    respond(200, ['success' => true, 'simulated' => true]);
}

$name = trim($name);
$email = trim($email);
$message = trim($message);

if (
    $name === '' ||
    strlen($name) > 200 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    strlen($email) > 254 ||
    $message === '' ||
    strlen($message) > 5000
) {
    respond(400, ['success' => false, 'error' => 'Invalid input data']);
}

$rateLimitSeconds = 60;
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateLimitFile = sys_get_temp_dir() . '/naiba_contact_' . hash('sha256', $ip);

if (file_exists($rateLimitFile) && time() - filemtime($rateLimitFile) < $rateLimitSeconds) {
    respond(429, ['success' => false, 'error' => 'Too many requests']);
}

touch($rateLimitFile);

if ($testMode) {
    respond(200, [
        'success' => true,
        'simulated' => true,
        'message' => 'Local test successful. No email was sent.',
    ]);
}

if (!$mailEnabled) {
    respond(503, ['success' => false, 'error' => 'Email delivery is not configured']);
}

$safeName = htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));

$subject = 'Website Contact Form';
$mailBody = "
    <strong>Name:</strong> {$safeName}<br>
    <strong>Email:</strong> {$safeEmail}<br><br>
    <strong>Message:</strong><br>
    {$safeMessage}
";

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: Website Contact <' . $siteEmail . '>',
    'Reply-To: ' . $email,
];

$success = mail(
    $siteEmail,
    $subject,
    $mailBody,
    implode("\r\n", $headers),
    '-f ' . $siteEmail
);

if (!$success) {
    respond(500, ['success' => false, 'error' => 'Mail delivery failed']);
}

respond(200, ['success' => true, 'simulated' => false]);