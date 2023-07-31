pipeline {
    agent any

    // Set console code page to UTF-8
    options {
        timestamps()
    }

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
                bat "npm audit fix --force"
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
