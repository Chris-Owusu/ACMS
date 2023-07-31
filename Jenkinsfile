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
                powershell """
                    Get-Content test_output.txt | ForEach-Object {
                        $_ -replace "\\e\\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]", ""
                    } | Out-File cleaned_output.txt
                """
            }
        }
        stage('Deploying') {
            steps {
                echo "Deploy the application"
            }
        }
    }
}
