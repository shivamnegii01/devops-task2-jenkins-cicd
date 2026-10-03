pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out source code from GitHub'
                checkout scm
            }
        }

        stage('Test Application') {
            steps {
                echo 'Running application tests'
                sh '''
                    docker run --rm \
                    -v "$WORKSPACE:/app" \
                    -w /app \
                    node:20-alpine npm test
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image'
                sh 'docker build -t jenkins-nodejs-app:latest .'
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Deploying application using Docker'
                sh '''
                    docker rm -f jenkins-nodejs-app || true

                    docker run -d \
                    --name jenkins-nodejs-app \
                    -p 3000:3000 \
                    --restart unless-stopped \
                    jenkins-nodejs-app:latest
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check Jenkins Console Output.'
        }
    }
}