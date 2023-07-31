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
                // Run tests and save output to test_output.txt
                powershell "npm run acms > test_output.txt"

                // Clean the output and save to cleaned_output.txt
                powershell "Get-Content test_output.txt | Select-String -NotMatch 'pattern' | Out-File cleaned_output.txt"
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
            // Debug the cleanup step
            powershell """
                Write-Host "Cleaning up test output..."
                Get-Content test_output.txt | ForEach-Object {
                    $_ -replace "\`\\x1B\`\\[[0-9;]*[a-zA-Z]", ""
                } | Out-File cleaned_output.txt
                Write-Host "Cleanup completed."
            """
        }
    }
}
