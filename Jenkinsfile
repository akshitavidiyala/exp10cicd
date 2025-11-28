pipeline {
    agent any

    environment {
        DOCKERHUB = credentials('dockerhub-creds')
        IMAGE_NAME = "akshitavidiyala/exp10-fullcicd"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "📥 Checking out code..."
                checkout scm
            }
        }

        stage('Build with npm') {
            steps {
                echo "📦 Installing dependencies..."
                sh 'npm install'
                echo "✅ Build step finished (tests can be added here)"
                // sh 'npm test'  // if you add tests later
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "🐳 Building Docker image..."
                    sh """
                      docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .
                    """
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    echo "🚀 Logging in & pushing image..."
                    sh """
                      echo ${DOCKERHUB_PSW} | docker login -u ${DOCKERHUB_USR} --password-stdin
                      docker push ${IMAGE_NAME}:${BUILD_NUMBER}
                    """
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    echo "☸️ Deploying to Kubernetes..."
                    sh """
                      sed 's#IMAGE_PLACEHOLDER#${IMAGE_NAME}:${BUILD_NUMBER}#' k8s-deployment.yaml | kubectl apply -f -
                      echo "🔍 Current pods:"
                      kubectl get pods
                      echo "🔍 Current services:"
                      kubectl get svc
                    """
                }
            }
        }
    }

    post {
        success {
            echo "🎉 Pipeline succeeded!"
        }
        failure {
            echo "❌ Pipeline failed!"
        }
    }
}