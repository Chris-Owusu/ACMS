pipeline {
    agent any
    stages {
        stage('Building') {
            steps {
                echo "Building the application"
            }
        }
        stage('Testing') {
            steps {
                sh "npm install"
                sh "npx cypress run"
            }
        }
        stage('Deploying') {
            steps {
                echo "Deploy the application"
            }
        }
    }
}
