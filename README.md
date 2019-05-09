# <a href="https://mystertravel.com/" target="_blank">Myster Travel</a>
> Mobile/desktop responsive app is travelers to keep an organized record of his/her travel memories
>
> Click on the title above to visit the live site

### App Features
> - Record trip details while traveling
>   - View world map and add pins to places user has visted
>   - Keep track of budget expenses
>   - Log notes and upload photos
>   - View trip summary and timeline
> - View previous trips
> - Persistent user login

### Accomplishments
> - Created a full scale application with front-end and back-end integration
> - Technologies used:
>    - React.js
>    - Redux
>    - PHP
>    - Sass
>    - Bootstrap4
>    -  Google Maps API with map marker, geolocation, and Google Places autocomplete search features
>    - AWS S3 file upload and file retrieval

### Project Planning and Progression Management
> - Click on the links below to view the project planning and progression tracking tools
>    - <a href="https://www.meistertask.com/projects/d5wdruhifd/join/" target="_blank">Task management</a>
>    - <a href="https://www.figma.com/file/Xmh37OwoBnlSgdptWpvYidkO/Myster-Travel?node-id=0%3A1" target="_blank">Wireframe planning</a>
>    - <a href="https://dbdesigner.page.link/aRYkTggDqqMi98sE8" target="_blank">Database schema</a>

### Setup Instructions
> This repo is built with React.js with Redux and PHP. Follow the below setup instructions to get started.
> 1. Fork this repo
> 1. Clone your forked copy of this repo
>    - `git clone https://github.com/[your_username]/mystertravel.git`
> 1. Change directory into the newly cloned repo
>    - navigate to the application folder `cd c219_travelagenda`
> 1. Install dependencies
>    - `npm install`
>    - navigate to the api folder `cd public/api`
>    - follow composer installation instructions <a href="https://getcomposer.org/download/" target="_blank">here</a> to install composer locally into the folder
>    - `php composer.phar install`
> 1. Create credential files
>    1. Database credentials
>        - navigate to the api folder `cd public/api`
>        - make a copy of the mysqlconnect.php.config file and rename new file to mysqlconnect.php
>        - add your database credentials
>    1. AWS S3 credentials
>        - navigate to the upload folder `cd upload`
>        - make a copy of the key.php.config file and rename new file to key.php
>        - add your AWS S3 credentials
>    1. API credentials
>        - navigate back to the application folder
>        - make a copy of the api_keys.js.config file and rename new file to api_keys.js
>        - add your Google credentials
> 1. Start dev server
>    - `npm start`
> 1. Open a browser and navigate to `localhost:3000`

### Authors
> - **Kylie Chao** (https://github.com/kylieclin)
> - **Jennifer Lai** (https://github.com/jen-icl)
> - **Quan Le** (https://github.com/quandhle)
> - **Westley Poon** (https://github.com/WestleyPoon)
