<?php

  function buildTree($account, $data, $parent) {
    $data[] = array($account['name'], null, 1);
    if ($account['subAccounts']) {
      foreach($account['subAccounts'] as $subAccount) {
        buildTree($subAccount, $data, $account['name']);
      }
    }
  }
  
  function vd($var) {
    echo"<pre>";
    var_dump($var);
    echo"</pre>";
    }
