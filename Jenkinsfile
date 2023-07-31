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
                script {
                    def npmInstallOutput = powershell(returnStdout: true, script: 'npm install').trim()
                    echo npmInstallOutput

                    def npmRunOutput = powershell(returnStdout: true, script: 'npm run acms').trim()
                    echo npmRunOutput

                    // Combine the outputs to create a single file for cleanup (Optional)
                    def combinedOutput = "${npmInstallOutput}\n${npmRunOutput}"
                    writeFile file: 'test_output.txt', text: combinedOutput
                }
            }
        }
        stage('Deploying') {
            steps {
                echo "Deploy the application"
            }
        }
    }
    post {
        always {
            // Clean up the output using findstr
            bat 'echo Cleaning up test output...'
            bat 'findstr /v /r "\\[.*m" test_output.txt > cleaned_output.txt'
        }
    }
}
