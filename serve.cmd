prompt $g
taskkill /im php.exe /f
cls
php -S 0.0.0.0:80 -t ./public
pause