pipeline {
    agent any

    parameters {
        string(name: 'SPEC', defaultValue: "cypress/e2e/", description: "Enter the script path you want to execute")
        choice(name: 'BROWSER', choices: ['chrome', 'edge', 'firefox'], description: 'where the browser will be executed')
    }

    stages {
        stage('Bulding') {
            steps {
                echo "Building the application"
            }
        }
        stage('Testing') {
            steps {
                bat "npm install"
                bat "npm fund"
                bat "npx cypress run"
            }
        }
        stage('Deploying') {
            steps {
                echo "Deploy the application"
            }
        }
    }
}