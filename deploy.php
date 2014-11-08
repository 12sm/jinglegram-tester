<?php

  $LOCAL_REPO = "/var/www/vhosts/jinglegram.me/";

  echo shell_exec("cd $LOCAL_REPO");
  echo shell_exec("git pull origin master");
?>
