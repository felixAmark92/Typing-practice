# Start the first server in the ./app directory with npm run dev
$appProcess = Start-Process -FilePath "npm" -ArgumentList "run dev" -WorkingDirectory ".\app" -PassThru

# Start the second server in the ./server directory with node main.js
$serverProcess = Start-Process -FilePath "node" -ArgumentList "main.js" -WorkingDirectory ".\server" -PassThru
