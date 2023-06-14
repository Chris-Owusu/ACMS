pipeline {
    agent any

    parameters {
        string(name: 'SPEC', defualtValue: "cypress/integration/", description: "Enter the script path you want to execute")
        choice(name: 'BROWSER', choices: ['chrome', 'edge', 'firefox'], description: 'where the browser will be executed')
    }

    options {
        ansiColor('xterm')
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
                bat "npx cypress run --browser ${BROWSER} --spec ${SPEC}"
            }
        }
        stage('Deploying') {
            steps {
                echo "Deploy the application"
            }
        }
    }
}