# Bike Rental form page

# Action

- Create repo for project
- Make sure engine is included in package.json
    "engines": {
    "node": ">=18.0.0"
  },
  as Github may detect lower version which may result in error.
- Create static web app in Azure while choosing github as source
- push code to github
  A github action should kick off and create a file in .github folder
- git pull the github action to your local
- Edit the github action file to make the app_location = "/dist and everything else ""
- push your changes
- Deploy should succeed