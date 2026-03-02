# ArgoCD GitOps Pipeline

## 📌 Overview

This project demonstrates a complete GitOps workflow using Kubernetes and ArgoCD.
Application deployments are managed declaratively through a Git repository, and the cluster state is automatically synchronized using ArgoCD.

The goal is to show how infrastructure and application updates can be controlled purely through Git commits.

## 🧰 Tech Stack

Kubernetes (Minikube / K3s)

ArgoCD

Docker

GitHub

## 🏗 Architecture

Application is containerized using Docker.

Docker image is pushed to Docker Hub.

Kubernetes manifests are stored in GitHub.

ArgoCD watches the Git repository.

Any change pushed to Git automatically updates the cluster.

---

## WorkFlow:

Code → Docker Build → Docker Hub → Update Manifest (Git) → ArgoCD Sync → Kubernetes Deployment


1️⃣ Start Kubernetes Cluster
minikube start

(or use K3s if preferred)

2️⃣ Install ArgoCD
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

Expose ArgoCD server:

kubectl port-forward svc/argocd-server -n argocd 8080:443
3️⃣ Build and Push Docker Image
docker build -t <docker-username>/gitops-demo:v1 .
docker push <docker-username>/gitops-demo:v1
4️⃣ Push Kubernetes Manifests to GitHub

Repository structure:

argocd-gitops-pipeline/
│
├── app/
│   ├── Dockerfile
│   ├── app.js
│   └── package.json
│
└── k8s/
    ├── deployment.yaml
    └── service.yaml
    
5️⃣ Configure ArgoCD Application

Create application from UI or CLI:

argocd app create gitops-demo \
  --repo https://github.com/<username>/<repo>.git \
  --path k8s \
  --dest-server https://kubernetes.default.svc \
  --dest-namespace default \
  --sync-policy automated
  
🔁 GitOps Workflow Demonstration

Build and push new image version:

docker build -t <username>/gitops-demo:v2 .
docker push <username>/gitops-demo:v2

Update deployment.yaml image tag:

image: <username>/gitops-demo:v2

Commit and push changes:

git add .
git commit -m "Upgrade to v2"
git push

ArgoCD detects change and automatically syncs.

Kubernetes performs rolling update.

Verify:

kubectl get pods

---

## 📸 Deliverables

GitHub repository with manifests

ArgoCD dashboard showing successful sync

Kubernetes pods showing updated version

Optional demo video explaining flow

---

## 📈 Key Learnings

Declarative Kubernetes deployments

Automated synchronization with ArgoCD

Version-controlled infrastructure

Rolling updates via Git commits

End-to-end GitOps implementation
