prompt $g
taskkill /im php.exe /f
cls
start chrome --new-window "http://127.0.0.1"
php -S 0.0.0.0:80 -t ./public
pause