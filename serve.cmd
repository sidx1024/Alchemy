prompt $g
taskkill /im php.exe /f
cls
start chrome --new-window "http://127.0.0.2"
php -S 127.0.0.2:80 -t ./public
pause