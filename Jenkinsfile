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
            // Clean up the output using PowerShell to remove ANSI escape codes
            powershell """
                Get-Content test_output.txt | ForEach-Object {
                    $_ -replace "\\x1B\\[[0-9;]*[a-zA-Z]", ""
                } | Out-File cleaned_output.txt
            """
        }
    }
}
