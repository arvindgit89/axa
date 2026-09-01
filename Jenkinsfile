```groovy
pipeline {
    agent any

    parameters {

        // Test Environment
        choice(
            name: 'ENVIRONMENT',
            choices: ['qa', 'staging', 'production'],
            description: 'Select test environment'
        )

        // Test Suite
        choice(
            name: 'TEST_SUITE',
            choices: ['smoke', 'sanity', 'regression', 'all'],
            description: 'Select test suite to execute'
        )

        // Browser
        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit'],
            description: 'Select browser'
        )

        // Number of workers
        string(
            name: 'WORKERS',
            defaultValue: '4',
            description: 'Number of Playwright workers'
        )

        // Sharding
        string(
            name: 'SHARD',
            defaultValue: '1/1',
            description: 'Playwright shard. Example: 1/4'
        )

        // Retry
        string(
            name: 'RETRIES',
            defaultValue: '1',
            description: 'Number of retries for failed tests'
        )

        // Headless / Headed
        booleanParam(
            name: 'HEADLESS',
            defaultValue: true,
            description: 'Run browser in headless mode'
        )

        // Git Branch
        string(
            name: 'BRANCH',
            defaultValue: 'develop',
            description: 'Git branch to build'
        )
    }

    environment {
        NODE_ENV = "${params.ENVIRONMENT}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Checking out branch: ${params.BRANCH}"

                git branch: "${params.BRANCH}",
                    url: 'https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git'
            }
        }

        stage('Node Version') {
            steps {
                bat 'node --version'
                bat 'npm --version'
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

                script {

                    def suiteCommand = ""

                    if (params.TEST_SUITE == 'smoke') {
                        suiteCommand = 'tests/smoke'
                    }
                    else if (params.TEST_SUITE == 'sanity') {
                        suiteCommand = 'tests/sanity'
                    }
                    else if (params.TEST_SUITE == 'regression') {
                        suiteCommand = 'tests/regression'
                    }
                    else {
                        suiteCommand = 'tests'
                    }

                    def command = """
                        npx playwright test ${suiteCommand} \
                        --project=${params.BROWSER} \
                        --workers=${params.WORKERS} \
                        --retries=${params.RETRIES} \
                        --shard=${params.SHARD}
                    """

                    bat command
                }
            }
        }
    }

    post {

        always {
            echo 'Publishing Playwright report...'

            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }

        success {
            echo 'Playwright tests passed successfully.'
        }

        failure {
            echo 'Playwright tests failed.'
        }

        cleanup {
            echo 'Cleaning workspace...'
        }
    }
}
```
