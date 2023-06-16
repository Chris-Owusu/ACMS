pipeline {
    agent any

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