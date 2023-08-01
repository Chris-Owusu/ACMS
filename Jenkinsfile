pipeline {
    agent any

    // Set console code page to UTF-8
    stages {
        stage('Set Console Code Page') {
            steps {
                bat 'chcp 65001'
            }
        }
        stage('Building') {
            steps {
                echo "Building the application"
            }
        }
        stage('Testing') {
            steps {
                bat "npm install"
                bat "npm run acms"
            }
        }
        stage('Deploying') {
            steps {
                echo "Deploy the application"
            }
        }
    }
}
