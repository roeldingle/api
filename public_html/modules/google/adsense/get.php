<?php
session_start();
require_once 'GoogleClientApi/Google_Client.php';
require_once 'GoogleClientApi/contrib/Google_AdsenseService.php';
require_once 'lib/common.php';


$scriptUri = "http://".$_SERVER["HTTP_HOST"].$_SERVER['PHP_SELF'];

$client = new Google_Client();
$client->setAccessType('online'); // default: offline
$client->setApplicationName('My Application name');
$client->setClientId('877944212970.apps.googleusercontent.com');
$client->setClientSecret('CegCa5iblYiRfhwicP0fvDEs');
$client->setRedirectUri($scriptUri);
$client->setDeveloperKey('AIzaSyD-Mg0ietgHy2rkaL7t6qePQbSDmCDZsPs'); // API key


$service = new Google_AdsenseService($client);


if (isset($_GET['logout'])) {
    unset($_SESSION['token_gadsense']);
    global $output_title, $output_body, $output_nav;
    $output_title = 'Adsense';
    $output_body = '<h1>You have been logged out.</h1>';
    $output_nav = '<li><a href="'.$scriptUri.'?login">Login</a></li>'."\n";
    include("output.php");
    die;
}

if (isset($_GET['login'])) {
    $authUrl = $client->createAuthUrl();
    header("Location: ".$authUrl);
}

if (isset($_GET['code'])) { // we received the positive auth callback, get the token and store it in session
    $client->authenticate();
    $_SESSION['token_gadsense'] = $client->getAccessToken();
    header("Location: ".$scriptUri);
    die;
}

if (isset($_SESSION['token_gadsense'])) { // extract token from session and configure client
    $token = $_SESSION['token_gadsense'];
    $client->setAccessToken($token);
}

$from = date('Y-m-d'); //, time()-2*24*60*60); // 2 days // => new data format available by Google '2011-06-24';
$to = date('Y-m-d'); // today

$from = '2013-04-09'; //, time()-2*24*60*60); // 2 days // => new data format available by Google '2011-06-24';
$to = '2013-05-08'; // today

global $_params;
$_params[] = 'domain';
$_params[] = 'page views';
$_params[] = 'page CTR';
$_params[] = 'page RPM';
$_params[] = 'clicks';
$_params[] = 'earnings';

$optParams = array();
$pageToken = null;
$optParams['maxResults'] = 10;
?>

<!DOCTYPE html>
<html>
<head>
<title>adsense.accounts.get | GoogleAdSense</title>
<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css" rel="stylesheet">
<link href="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/themes/smoothness/jquery-ui.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1>GoogleAdSense (Get)</h1>
        <?php
        if (!$client->getAccessToken()) { // auth call to google
        ?>
        <a href="<?php echo $scriptUri;?>?login=true" class="btn">Login in Google</a>
        <?php
            die();
        }
        ?>
        <hr />
        <h4>Request: <span class="badge badge-success">adsense.accounts.get</span></h4>
        <strong>- Get information about the selected AdSense account.</strong> <br /><br />        
        <?php
        
        try {
            
            // $result = $service->reports->generate($_POST['start'], $_POST['end'], $optParams);
            $accountId = 'pub-8371544170451655';
            $optParams = array('tree' => true);
            // Retrieve account with sub accounts.
            $account = $service->accounts->get($accountId, $optParams);
            ?>
            <table class="table">
            <?php
            if ($account) {
                foreach ($account as $key => $rows) {
            ?>
                <tr><td><?php echo $key;?></td><td><?php echo $rows; ?></td></tr>
            <?php
                }
            }
            ?>
            </table>
            <?php
        ?>

        <?php
        } catch (Exception $e) {
            ?>
                    <a href="<?php echo $scriptUri;?>?login=true" class="btn">Login in Google</a>
            <?php
        }
        ?>        
        
    </div>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
    <script>
        jQuery(document).ready(function () {
            $("#start, #end").datepicker({
                dateFormat: 'yy-mm-dd'
            });
        });
    </script>
</body>
</html>