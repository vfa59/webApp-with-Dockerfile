Flashcard Web App on Kubernetes

Live App URL: http://34.135.255.159/

This repository includes everything you need to deploy a flashcard quiz web app on Google Kubernetes Engine (GKE). The app features a simple frontend served by NGINX and a Flask-based backend that handles the quiz logic.

Application Overview

    Purpose:
        A simple flashcard quiz app where users select a category and answer questions. After completing a set of flashcards, users see their quiz results.

    Features:
        - Four categories: Math, Geography, Science, and General Trivia
        - Frontend in HTML/CSS/JavaScript
        - Backend API serving JSON flashcards built in Flask

    Architecture:
        - Frontend: Static HTML/CSS/JS app served via an NGINX container
        - Backend: Flask API containerized with Python
        - No database: Data is hardcoded in backend Python script
        - Note: No storage persistence is required, as the backend serves static data and does not interact with any database or file system.

DockerHub Images
    Frontend Docker Image: vfa595/flashcard-frontend:latest
    Backend Docker Image: vfa595/flashcard-backend:latest

    Link to DockerHub images: https://hub.docker.com/repositories/vfa595

Kubernetes Deployment

    Prerequisites
     - DockerHub account and Docker Desktop installed
     - Google Cloud SDK installed
     - Kubernetes cluster (GKE) created
     - kubectl and gcloud CLI tools installed

    Step-by-Step Deployment Process:

        1. Image Building (Build and Push to DockerHub)

            Before starting, Docker Desktop was ran on the machine, as  Docker commands require the Docker daemon to be active, or they will fail.

            This app contains two separate Dockerfiles:
                - backend/Dockerfile
                - frontend/Dockerfile

            Build and Push Docker Images (Windows PowerShell):
                - Login with: docker login
                - For backend image (inside backend/ directory of app)
                    Commands:
                        docker build -t vfa595/backend:latest .
                        docker push vfa595/backend:latest
                - For frontend image (inside frontend/ directory of app)
                    Commands:
                        docker build -t vfa595/frontend:latest .
                        docker push vfa595/frontend:latest

        2. Authentication with Google Cloud (on Google Cloud SDK Shell)
            Command: gcloud auth login

        3. Setting the correct GCP Project
            Command: gcloud config set project YOUR_PROJECT_ID
            
            Sample Command: gcloud config set project flashcard-app-grp6

        4. Creation of Kubernetes Cluster
            Command: gcloud container clusters create flashcard-cluster \
                        --zone=us-central1-a \
                        --num-nodes=3 

        5. Connect to GKE Cluster
            Command: gcloud container clusters get-credentials flashcard-cluster --zone=us-central1-a

        6. Install NGINX Ingress Controller
            Command: kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.1/deploy/static/provider/cloud/deploy.yaml

        7. Navigate to Kubernetes Manifest Directory
            Command: cd %USERPROFILE%\Desktop\webApp-with-Dockerfile\kubernetes-manifests

        8. Once in the kubernetes-manifests folder, Kubernetes manifests were applied
            Command: kubectl apply -f .

            This applies the following files:

            A. Pods and Deployments

                backend-deployment.yaml: Defines the backend pod template and deployment using vfa595/backend:latest.

                frontend-deployment.yaml: Defines the frontend pod template and deployment using vfa595/frontend:latest.

            B. Services

                backend-service.yaml: Exposes the backend pod internally within the cluster.

                frontend-service.yaml: Exposes the frontend pod for use with the ingress.

            C.Ingress

                ingress.yaml: Maps external HTTP requests to internal services (e.g., /api to backend, / to frontend).

                Enables public web access via an external IP.

            D. Autoscaling

                hpa.yaml: Horizontal Pod Autoscaler configuration for the backend.

                    - Minimum replicas: 2
                    - Maximum replicas: 5
                    - Target CPU utilization: 50%
        
        9. Access App

            Commands used to get external IP of the ingress controller:
                kubectl get ingress
                kubectl get svc -n ingress-nginx

Live App URL: http://34.135.255.159/






