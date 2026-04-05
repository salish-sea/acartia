echo 'Starting deployment process'
git pull
cd src/client
echo 'Begin build process'
npm run build
sudo cp -R dist/* /var/www/html/
echo 'Restarting backend'
pm2 restart 0
echo 'Deployment complete'
