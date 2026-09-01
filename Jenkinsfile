pipeline {
    agent any

    environment {
        CI = 'true'
    }
    parameters {
        choice(
            name: 'TEST_TAG',
            choices: ['@smoke', '@regression'],
            description: 'Select test tag'
        )
    }
    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/arvindgit89/axa.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                bat "npx playwright test --grep \"${TEST_TAG}\""
            }
        }
    }

    post {
        always {
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
        }

        success {
            echo 'Tests passed.'
        }

        failure {
            echo 'Tests failed.'
        }
    }
}
